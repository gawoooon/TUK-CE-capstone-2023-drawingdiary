package com.diary.drawing.imagestyle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.imagestyle.domain.ImageStyle;

@Repository
public interface ImageStyleRepository extends JpaRepository<ImageStyle, Long>{
    ImageStyle findByImageStyleID(Long imageStyleID);
}
