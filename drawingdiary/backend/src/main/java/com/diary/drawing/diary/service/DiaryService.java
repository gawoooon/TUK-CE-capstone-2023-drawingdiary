package com.diary.drawing.diary.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.repository.AlbumRepository;
import com.diary.drawing.comment.CommentRepository;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.dto.CalenderDTO;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.dto.DiaryResponseDTO;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.diary.repository.ImageRepository;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.repository.ImageStyleRepository;
import com.diary.drawing.sentiment.repository.SentimentRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;
import com.diary.drawing.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;



@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final SentimentRepository sentimentRepository;
    private final ImageRepository imageRepository;
    private final CommentRepository commentRepository;
    private final AlbumRepository albumRepository;
    private final MemberRepository memberRepository;
    private final ImageStyleRepository imageStyleRepository;
    private final ValidateDiaryService validateDiaryService;
    private final ValidateMemberService validateMemberService;
    private final ImageService imageService;


    /* Date로 내용조회 */
    public DiaryResponseDTO getDiary(LocalDate date, Long memberID) throws Exception{
        Member member = validateMemberService.validateMember(memberID);
        Diary diary = validateDiaryService.findByDateAndMember(date, member);
        //TODO: 여기 임시로 64로 주는거임 나중에 s3에 올려야함
        String image64File = imageService.get64Image(diary.getImage().getImageFile());
        DiaryResponseDTO diaryResponseDTO = DiaryResponseDTO.from(diary, image64File);
        return diaryResponseDTO;
    }

    /* diaryID로 내용조회 */
    public DiaryResponseDTO getDiaryID(Long diaryID) throws Exception{
        Diary diary = diaryRepository.findByDiaryID(diaryID);
        //TODO: 여기 임시로 64로 주는거임 나중에 s3에 올려야함
        String image64File = imageService.get64Image(diary.getImage().getImageFile());
        DiaryResponseDTO diaryResponseDTO = DiaryResponseDTO.from(diary, image64File);
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
            .map(diary -> new CalenderDTO(diary.getDate(), imageService.get64Image(diary.getImage().getImageFile()), diary.getText()))  //TODO: 여기 S3대신 임시로 넣었음
            .collect(Collectors.toList());
        return response;
    }

    @Transactional
    public ResponseEntity<?> delete(LocalDate date, Long memberID){
        Member member = validateMemberService.validateMember(memberID);
        Diary diary = validateDiaryService.findByDateAndMember(date, member);

        diaryRepository.delete(diary);
        sentimentRepository.delete(diary.getSentiment());
        imageRepository.delete(diary.getImage());
        commentRepository.delete(diary.getComment());

        return ResponseEntity.ok("일기 삭제가 완료되었습니다.");
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

        return diaryRepository.save(oldDiary.testUpdate(diaryRequestDTO, s));
    }
    

}
