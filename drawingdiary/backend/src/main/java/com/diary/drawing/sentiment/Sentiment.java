package com.diary.drawing.sentiment;

import com.diary.drawing.diary.domain.Diary;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

    @OneToOne  // 한개의 다이어리는 하나만
    @JoinColumn(name = "diaryID") // 외부키 references from diaryID
    private Diary diary;

    // positive, netural, negative 순으로 퍼센티지 숫자로 저장됨
    private String sentiment;

    public Sentiment(){}

    @Builder
    public Sentiment(Diary diary, String sentiment){
        this.diary = diary;
        this.sentiment = sentiment;
    }

}
