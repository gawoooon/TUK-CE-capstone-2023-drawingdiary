package com.diary.drawing.diary.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.album.service.ValidateAlbumService;
import com.diary.drawing.comment.Comment;
import com.diary.drawing.comment.CommentRepository;
import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.domain.Image;
import com.diary.drawing.diary.dto.DiaryResponseDTO;
import com.diary.drawing.diary.dto.FinalDiaryRequestDTO;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.diary.repository.ImageRepository;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.service.ImageStyleService;
import com.diary.drawing.sentiment.domain.Sentiment;
import com.diary.drawing.sentiment.repository.SentimentRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor

@Service
public class GenerateDiaryService {
    /* 다이어리 완성을 위한 서비스, (+ 감정, 이미지, 코멘트) */
    private final ValidateMemberService validateMemberService;
    private final DiaryRepository diaryRepository;
    private final SentimentRepository sentimentRepository;
    private final CommentRepository commentRepository;
    private final ValidateAlbumService validateAlbumService;
    private final ImageRepository imageRepository;
    private final ImageStyleService imageStyleService;
    

    @Transactional
    public ResponseEntity<DiaryResponseDTO> generateDiary(FinalDiaryRequestDTO finalDiaryRequestDTO, Long memberID){

        // 0. id로 멤버 객체 가져오기
        Member member = validateMemberService.validateMember(memberID);

        // 1. (없으면 sentiment 추가) Sentiment 객체 받아옴
        Sentiment sentiment = new Sentiment(finalDiaryRequestDTO.getConfidence());
        sentimentRepository.save(sentiment);

        // 2. (없으면 comment 추가) Comment 객체 받아옴
        Comment comment = new Comment(finalDiaryRequestDTO.getComment());
        commentRepository.save(comment);

        // 3. (없으면 image 추가), Image 객체 받아옴
        // 3.1 먼저 앨범 Album 가져오기
        Album album = validateAlbumService.validateAlbum(finalDiaryRequestDTO.getAlbumID());
        // 3.2 이미지 스타일 가져오기
        ImageStyle imageStyle = imageStyleService.validateStyle(finalDiaryRequestDTO.getStyleName());

        Image image = Image.builder()
            .imageFile(finalDiaryRequestDTO.getImageFile())
            .album(album)
            .date(finalDiaryRequestDTO.getDate())
            .build();
        imageRepository.save(image);

        // 4. style count 1 오름 일단생략!!!!!!!
        // prompt? 로그찍기? 프롬프트에 추천 시스템 일치 OX 추가?

        // 5. Diary 객체에 한번에 추가하기
        Diary diary = Diary.builder()
            .text(finalDiaryRequestDTO.getText())
            .weather(finalDiaryRequestDTO.getWeather())
            .date(finalDiaryRequestDTO.getDate())
            .member(member)
            .imageStyle(imageStyle)
            .image(image)
            .comment(comment)
            .sentiment(sentiment)
            .build();
        diaryRepository.save(diary);
        return ResponseEntity.ok(DiaryResponseDTO.from(diary));

    }



    /* 완료버튼으로 다이어리 수정했을때 */
    /* 메소드명: updateDiary(Diary diary, diaryRequestDTO) */
    // 0. Member validate
    // 1. id로 Diary 객체 받아옴
    // 2. Diary 객체에서 코멘트 받아와서 수정
    // 3. Diary 객체에서 sentiment 받아와서 수정
// 프롬포트 남기던가 로그 남기던가
    // 5. DIary 객체에서 image 받아와서 수정
    // 5.0 Album 가져오기
    // 6. Diary 객체에 다른 내용들 받아서 전체수정
    // 7. Response로 수정 OK 싸인
}
