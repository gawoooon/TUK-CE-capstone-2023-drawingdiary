package com.diary.drawing.domain.sentiment.domain;

import com.diary.drawing.domain.sentiment.dto.SentimentDTO.Confidence;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "Sentiment")
public class Sentiment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sentimentID;

    private double positive;
    private double negative;
    private double neutral;

    public Sentiment(Confidence confidence){
        this.positive = confidence.getPositive();
        this.negative = confidence.getNeutral();
        this.neutral = confidence.getNegative();
    }

    public Sentiment fromConfidence(Confidence confidence){
        this.positive = confidence.getPositive();
        this.negative = confidence.getNeutral();
        this.neutral = confidence.getNegative();
        return this;
    }
}
