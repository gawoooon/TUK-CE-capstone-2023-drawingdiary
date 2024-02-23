package com.diary.drawing.diary.service;

import org.springframework.stereotype.Service;

@Service
public class GenerateDiaryService {
    /* 다이어리 완성을 위한 서비스, (+ 감정, 이미지, 코멘트) */

    /* 완전 처음 생성할때 */
    /* 메소드명: public DiaryRequestDTO generateDiary(DiaryRequestDTO diaryRequestDTO) */
    // 1. Diary 수정, Diary 객체 받아옴                            --> [완료] Diary diary = diaryService.updateDiary(diaryRequestDTO)
    // 2. Diary 객체 getText로 Comment 객체 받아옴                 --> [임시] comment = "tempCommenttest"
    // 3. Diary 객체로 Sentiment 객체 받아옴                       --> [임시/연결해야함]
    // 4. sentiment까지 있는 prompt 생성, Prompt객체 받아옴         --> [완료/연결해야함] Prompt prompt = promptService.create(diary, sentiment)
    // 5. Prompt 사용해서 Image 생성, Image 객체 받아옴             --> [진행중]
    // 6. Diary 객체에 comment sentiment image 한꺼번에 수정저장
    // 7. GenerateRequestDTO로 수정 완료된 diaryID 전달            --> [진행중] return new generateDTO(diary)


    /* 완료버튼으로 다이어리 수정했을때 */
    /* 메소드명: reGenerateDiary(Diary diary, diaryRequestDTO) */
    // 1. Diary 수정, Diary 객체 받아옴
    // 2. Diary 객체 getText로 Comment 생성
    // 3. Diary 객체 getText로 Sentiment 받아옴 --> [완료] 지원언니가 추가!
    // 4. sentiment까지 있는 prompt 생성, Prompt객체 받아옴
    // 5. Prompt 사용해서 Image 생성, Image 객체 받아옴
    // 6. Diary 객체에 comment sentiment image 한꺼번에 수정저장
    // 7. GenerateRequestDTO로 수정 완료된 diaryID 전달
}
