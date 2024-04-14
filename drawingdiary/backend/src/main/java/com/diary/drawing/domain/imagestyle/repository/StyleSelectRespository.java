package com.diary.drawing.domain.imagestyle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.domain.imagestyle.domain.StyleSelectHistory;

@Repository
public interface StyleSelectRespository extends JpaRepository<StyleSelectHistory, Long>{

}
