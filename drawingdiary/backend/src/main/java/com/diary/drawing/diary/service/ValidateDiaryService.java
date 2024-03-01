package com.diary.drawing.diary.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.DiaryRepository;
import com.diary.drawing.user.domain.Member;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class ValidateDiaryService {

        private final DiaryRepository diaryRepository;

        /*
         * 1. diaryID로 다이어리 찾기
         * 2. date로 다이어리 찾기
         *
         */

        /* Date로 다이어리 찾기 */
        public Diary findByDateAndMember(LocalDate date, Member member) {
                return diaryRepository.findByDateAndMember(date, member)
                                .orElseThrow(() -> new DiaryResponseException(DiaryExceptionType.NOT_FOUND_DIARY));
        }



}
