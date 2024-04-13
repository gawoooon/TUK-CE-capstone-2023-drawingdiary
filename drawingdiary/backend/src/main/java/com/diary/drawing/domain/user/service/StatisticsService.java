package com.diary.drawing.domain.user.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.time.temporal.ChronoField;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.diary.drawing.domain.diary.domain.Diary;
import com.diary.drawing.domain.diary.exception.DiaryExceptionType;
import com.diary.drawing.domain.diary.exception.DiaryResponseException;
import com.diary.drawing.domain.diary.repository.DiaryRepository;
import com.diary.drawing.domain.imagestyle.domain.MemberStylePreference;
import com.diary.drawing.domain.imagestyle.repository.MemberStylePreferenceRespository;
import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.MemberDTO.Data;
import com.diary.drawing.domain.user.dto.MemberDTO.Emotion;
import com.diary.drawing.domain.user.dto.MemberDTO.Lawn;
import com.diary.drawing.domain.user.dto.MemberDTO.Statistic;
import com.diary.drawing.domain.user.dto.MemberDTO.Value;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final DiaryRepository diaryRepository;
    private final ValidateMemberService validateMemberService;
    public final MemberStylePreferenceRespository stylePreferenceRespository;

    // 통계페이지
    public ResponseEntity<?> makeStatics(Long memberID){
        Member member = validateMemberService.validateMember(memberID);
    
        // 0. 오늘 날짜 / 연단위 다이어리 리스트
        LocalDate today = LocalDate.now();
        int currentYear = today.getYear();
        LocalDate firstDay = Year.of(currentYear).atDay(1);
        LocalDate lastDay = Year.of(currentYear).atMonth(12).atEndOfMonth();
        List<LocalDate> exist = diaryExistForYear(firstDay, lastDay, member);
        
        // 1. lawn
        Lawn lawn = makeLawn(firstDay, lastDay, exist);
        
        // 2. value
        Value value = makeValue(today, exist, member);
        
        // 3. emotion
        List<Emotion> emotions = makeEmotion(today, member);

        Statistic statistic = Statistic.builder()
            .lawn(lawn)
            .value(value)
            .emotions(emotions)
            .build();

        return ResponseEntity.ok(statistic);
    }

    private List<LocalDate> diaryExistForYear(LocalDate firstDay, LocalDate lastDay, Member member){
        List<Diary> diaries;
        try {
            diaries = diaryRepository.findByMemberAndDateBetween(member, firstDay, lastDay);
        } catch (Exception e) {
            // 데이터베이스 오류 처리
            throw new DiaryResponseException(DiaryExceptionType.NOT_EXIST_CONTEXT);
        }
        List<LocalDate> exist = diaries.stream()
            .map(diary -> diary.getDate())
            .collect(Collectors.toList());
        
        return exist;
    }

    private Lawn makeLawn(LocalDate firstDay, LocalDate lastDay, List<LocalDate> exist){
        // 1. lawn
        List<Data> lawnData = new ArrayList<>();
        for(LocalDate date = firstDay; !date.isAfter(lastDay); date=date.plusDays(1)){
            boolean iswritten = exist.contains(date);
            Data put = new Data(date, iswritten);
            lawnData.add(put);
        }
        Lawn lawn = new Lawn(exist.size(), lawnData);
        return lawn;
    }

    @SuppressWarnings("null")
    private Value makeValue(LocalDate today, List<LocalDate> exist, Member member){
                // 2. value
        // 2.1 month
        YearMonth yearMonth = YearMonth.of(today.getYear(), today.getMonthValue());
        LocalDate nowFirst = yearMonth.atDay(1);
        LocalDate nowEnd = yearMonth.atEndOfMonth();
        int month = 0;
        for(LocalDate date = nowFirst; !date.isAfter(nowEnd); date=date.plusDays(1)){
            if(exist.contains(date)) month++;
        }
        // 2.2 average (averge는 당일부터 2달 단위로 갱신)
        LocalDate twoMonthsAgo = today.minusMonths(2);
        long totalDays = ChronoUnit.DAYS.between(twoMonthsAgo, today) + 1;
        long totalWeeks = totalDays / 7;

        Map<Integer, Long> weeklyDiaryCounts = exist.stream()
            .filter(date -> !date.isBefore(twoMonthsAgo) && !date.isAfter(today))
            .collect(Collectors.groupingBy(date -> date.get(ChronoField.ALIGNED_WEEK_OF_MONTH), Collectors.counting()));

        double average = weeklyDiaryCounts.values().stream()
            .mapToLong(count -> count)
            .average()
            .orElse(0);

        // 2.3 style
            // 일기를 작성한 적이 없거나 오류나면 null
        List<MemberStylePreference> preferences = stylePreferenceRespository.findPreferenceWithMaxFrequency(member);
        MemberStylePreference firstPreference = null;
        if (!preferences.isEmpty()) {
            firstPreference = preferences.get(0);
        }

        return new Value(month, average, firstPreference.getImageStyle().getStyleName());

    }

    private List<Emotion> makeEmotion(LocalDate today, Member member){
        List<Emotion> emotions = new ArrayList<>();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        List<Diary> thisWeekDiaries = diaryRepository.findByMemberAndDateBetween(member, startOfWeek, endOfWeek);
        for(LocalDate d = startOfWeek; !d.isAfter(endOfWeek); d=d.plusDays(1)){

            LocalDate i = d;
            Diary getDiary = thisWeekDiaries.stream()
                .filter(diary -> diary.getDate().equals(i))
                .findFirst()
                .orElse(null);
            
            if(getDiary != null){
                emotions.add(new Emotion(
                    (int) Math.round(getDiary.getSentiment().getPositive()),
                    (int) Math.round(getDiary.getSentiment().getNeutral()),
                    (int) Math.round(getDiary.getSentiment().getNegative())
                ));
            } else{
                emotions.add(null);
            }
        }
        return emotions;
    }
}
