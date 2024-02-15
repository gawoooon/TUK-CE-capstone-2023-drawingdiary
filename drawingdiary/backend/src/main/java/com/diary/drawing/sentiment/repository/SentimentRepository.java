package com.diary.drawing.sentiment.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.sentiment.domain.Sentiment;

@Repository
public interface SentimentRepository extends JpaRepository<Sentiment, Long> {
}
