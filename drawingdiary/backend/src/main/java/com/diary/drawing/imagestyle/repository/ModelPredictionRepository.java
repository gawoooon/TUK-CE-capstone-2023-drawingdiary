package com.diary.drawing.imagestyle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.imagestyle.domain.ModelPrediction;


@Repository
public interface ModelPredictionRepository extends JpaRepository<ModelPrediction, Long>{
    ModelPrediction findByMember_MemberID(Long memberID);
}
