package com.diary.drawing.sentiment.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Sentiment")
public class Sentiment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sentimentID;

    // positive, netural, negative 순으로 퍼센티지 숫자로 저장됨
    private String sentiment;

    public Sentiment(){}

    @Builder
    public Sentiment(String sentiment){
        this.sentiment = sentiment;
    }

}
