package com.diary.drawing.domain.diary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.domain.diary.domain.Diary;
import com.diary.drawing.domain.diary.domain.Prompt;

@Repository
public interface PromptRepository extends JpaRepository<Prompt, Long>{
    Prompt findByPromptID(Long promptID);
    List<Prompt> findByDiary(Diary diary); // 다이어리에 해당하는 전체 prompt 출략
}

