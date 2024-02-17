package com.diary.drawing.diary.domain;

import java.sql.Timestamp;

import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageID;

    private String imageFile;

    @LastModifiedDate
    private Timestamp creationDate;

    @OneToOne  // 한개의 다이어리는 하나만
    @JoinColumn(name = "diaryID") // 외부키 references from diaryID
    private Diary diary;

    @ManyToOne(fetch = FetchType.LAZY)  // 한개의 날짜는 여러개의 이미지
    @JoinColumn(name = "dateID") // 외부키 references from dateID
    private Date date;
    
    @OneToOne // 한개의 프롬포트는 하나만
    @JoinColumn(name = "promptID") // 외부키 references from promptID
    private Prompt prompt;

    @Builder
    public Image(String imageFile, Diary diary, Date date, Prompt prompt){
        this.imageFile = imageFile;
        this.diary = diary;
        this.date = date;
        this.prompt = prompt;
    }

    public void update(String imageFile, Diary diary, Date date, Prompt prompt){
        this.imageFile = imageFile;
        this.diary = diary;
        this.date = date;
        this.prompt = prompt;
    }
    
}
