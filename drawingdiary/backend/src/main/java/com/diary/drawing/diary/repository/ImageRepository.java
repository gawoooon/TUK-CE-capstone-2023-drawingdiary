package com.diary.drawing.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.domain.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{

    Image findByImageID(Long imageID);
    Image findByDiaryID(Diary diary);
}
    
