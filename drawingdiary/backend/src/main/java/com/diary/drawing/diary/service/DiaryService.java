package com.diary.drawing.diary.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.CalenderDTO;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.dto.DiaryResponseDTO;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;
import com.diary.drawing.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;



@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class DiaryService {

    
    private final DiaryRepository diaryRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final ImageStyleRepository imageStyleRepository;
    private final ValidateDiaryService validateDiaryService;
    private final ValidateMemberService validateMemberService;


    /* Date로 내용조회 */
    public DiaryResponseDTO getDiary(LocalDate date, Long memberID) throws Exception{
        Member member = validateMemberService.validateMember(memberID);
        Diary diary = validateDiaryService.findByDateAndMember(date, member);
        DiaryResponseDTO diaryResponseDTO = DiaryResponseDTO.from(diary);
        return diaryResponseDTO;
    }

    /* diaryID로 내용조회 */
    public DiaryResponseDTO getDiaryID(Long diaryID) throws Exception{
        Diary diary = diaryRepository.findByDiaryID(diaryID);
        DiaryResponseDTO diaryResponseDTO = DiaryResponseDTO.from(diary);
        return diaryResponseDTO;
    }

    /* 년월, 멤버id로 모든 다이어리 return 하는 캘린더 서비스 */
    public List<CalenderDTO> calender(int year, int month, Long memberID){
        Member member = validateMemberService.validateMember(memberID);

        // 년월로 startDate와 endDate 얻기
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<Diary> calender = diaryRepository.findByMemberAndDateBetween(member, startDate, endDate);
        if (calender == null){ throw new DiaryResponseException(DiaryExceptionType.NOT_EXIST_CONTEXT);}
        List<CalenderDTO> response =  calender.stream()
            .map(diary -> new CalenderDTO(diary.getDate(), diary.getImage().getImageFile(), diary.getText()))
            .collect(Collectors.toList());
        return response;
    }


    /* 전체 다이어리 추가 테스트용 api */
    @Transactional
    public Diary testcreateDiary(DiaryRequestDTO diaryRequestDTO){

        // date album member 찾기
        //TODO: 존재확인 validation 함수 추가로 예외처리
        Album album = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        Optional<Member> member = memberRepository.findByMemberID(diaryRequestDTO.getMemberID());
        ImageStyle style = imageStyleRepository.findByStyleID(diaryRequestDTO.getStyleID());


        Diary diary = Diary.builder()
            .text(diaryRequestDTO.getText())
            .weather(diaryRequestDTO.getWeather())
            .date(diaryRequestDTO.getDate())
            .member(member.get())
            .imageStyle(style)
            .build();
        return diaryRepository.save(diary);
    }

    
    /* 다이어리 수정 테스트 메소드 */
    @Transactional
    public Diary updateDiary(DiaryRequestDTO diaryRequestDTO, Long diaryID){

        // 다이어리 객체 찾기
        Diary oldDiary = diaryRepository.findByDiaryID(diaryID);

        // date album member 찾기
        //TODO: 존재확인 validation 함수 추가로 예외처리
        Album a = albumRepository.findByAlbumID(diaryRequestDTO.getAlbumID());
        ImageStyle s = imageStyleRepository.findByStyleID(diaryRequestDTO.getStyleID());

        return diaryRepository.save(oldDiary.update(diaryRequestDTO, s));
    }
    

}
