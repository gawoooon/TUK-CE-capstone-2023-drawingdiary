package com.diary.drawing.domain.imagestyle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.domain.imagestyle.domain.ImageStyle;


@Repository
public interface ImageStyleRepository extends JpaRepository<ImageStyle, Long>{
    ImageStyle findByStyleID(Long StyleID);
    ImageStyle findByStyleName(String styleName);
}
