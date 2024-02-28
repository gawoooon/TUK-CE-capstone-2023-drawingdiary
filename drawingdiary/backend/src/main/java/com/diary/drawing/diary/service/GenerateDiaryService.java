package com.diary.drawing.diary.service;

import org.springframework.stereotype.Service;

@Service
public class GenerateDiaryService {
    /* 다이어리 완성을 위한 서비스, (+ 감정, 이미지, 코멘트) */

    /* 완전 처음 생성할때 */
    /* 메소드명: public FinalDiaryRequestDTO generateDiary(FinalDiaryRequestDTO finalDiaryRequestDTO) */
// 0. id로 멤버 가져오기
// 1. sentiment 추가, Sentiment 객체 받아옴
// 2. comment 추가, Comment 객체 받아옴
// 3. image 추가, Image 객체 받아옴
// 4. style count 추가
// prompt? 로그찍기? 프롬프트에 추천 시스템 일치 OX 추가?
// 5.0 Album 가져오기
// 5. Diary 객체에 한번에 추가하기
// 6. 일기 저장 OK 보내기


    /* 완료버튼으로 다이어리 수정했을때 */
    /* 메소드명: updateDiary(Diary diary, diaryRequestDTO) */
    // 0. Member validate
    // 1. Diary 객체 받아옴
    // 2. Diary 객체에서 코멘트 받아와서 수정
    // 3. Diary 객체에서 sentiment 받아와서 수정
// 프롬포트 남기던가 로그 남기던가
    // 5. DIary 객체에서 image 받아와서 수정
    // 5.0 Album 가져오기
    // 6. Diary 객체에 다른 내용들 받아서 전체수정
    // 7. Response로 수정 OK 싸인
}
