package com.diary.drawing.diary.service;

import java.io.FileNotFoundException;

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
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.diary.repository.ImageRepository;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.imagestyle.service.ImageStyleService;
import com.diary.drawing.sentiment.domain.Sentiment;
import com.diary.drawing.sentiment.repository.SentimentRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.service.ValidateMemberService;

import io.jsonwebtoken.io.IOException;
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
    private final ValidateDiaryService validateDiaryService;
    private final ImageService imageService;
    

    @Transactional
    public ResponseEntity<DiaryResponseDTO> generateDiary(FinalDiaryRequestDTO finalDiaryRequestDTO, Long memberID) throws IOException, FileNotFoundException, java.io.IOException{

        // 0. id로 멤버 객체 가져오기, 다이어리 유무 validate
        Member member = validateMemberService.validateMember(memberID);
        if(diaryRepository.existsByDateAndMember(finalDiaryRequestDTO.getDate(), member))
            {throw new DiaryResponseException(DiaryExceptionType.ALREADY_EXIST_DIARY);}

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

        Image image = imageService.createImage(finalDiaryRequestDTO.getImageFile(), album, finalDiaryRequestDTO.getDate());

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
        return ResponseEntity.ok(DiaryResponseDTO.from(diary, imageService.get64Image(image.getImageFile())));

    }

    @Transactional
    public ResponseEntity<DiaryResponseDTO> updateDiary(FinalDiaryRequestDTO finalDiaryRequestDTO, Long memberID) throws IOException, FileNotFoundException, java.io.IOException{
        // 0. Member validate
        Member member = validateMemberService.validateMember(memberID);

        // 1. id로 Diary 객체 받아옴
        Diary diary = validateDiaryService.findByDateAndMember(finalDiaryRequestDTO.getDate(), member);

        // 2. Diary 객체에서 코멘트 받아와서 수정
        Comment comment = diary.getComment();
        if(comment == null){throw new DiaryResponseException(DiaryExceptionType.NOT_FOUND_COMMENT);}
        comment.update(finalDiaryRequestDTO.getComment());  // transactional로 자동 저장

        // 3. Diary 객체에서 sentiment 받아와서 수정
        Sentiment sentiment = diary.getSentiment();
        if(sentiment == null){throw new DiaryResponseException(DiaryExceptionType.NOT_FOUND_SENTIMENT);}
        sentiment.fromConfidence(finalDiaryRequestDTO.getConfidence());

        // 프롬포트 남기던가 로그 남기던가
        // style cnt 나중에 추가

        // 5. Dㅑary 객체에서 image 받아와서 수정{
        // 5.1 먼저 Album validate
        Album album = validateAlbumService.validateAlbum(finalDiaryRequestDTO.getAlbumID());
        Image image = diary.getImage();
        if(image == null){throw new DiaryResponseException(DiaryExceptionType.NOT_FOUND_IMAGE);}
        imageService.updateImage(finalDiaryRequestDTO.getImageFile(), album, image);

        //6.0 이미지 스타일 가져오기
        ImageStyle imageStyle = imageStyleService.validateStyle(finalDiaryRequestDTO.getStyleName());

        // 업데이트
        diary.update(finalDiaryRequestDTO, imageStyle);

        return ResponseEntity.ok(DiaryResponseDTO.from(diary, imageService.get64Image(image.getImageFile())));

    }

}

