package com.diary.drawing.diary.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.diary.repository.DiaryRepository;

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
    
    
}
