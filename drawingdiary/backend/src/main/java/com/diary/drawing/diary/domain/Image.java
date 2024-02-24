package com.diary.drawing.diary.domain;

import com.diary.drawing.common.BaseTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Image")
public class Image extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageID;

    @Column(length = 600)
    private String imageFile;

    // @OneToOne  // 한개의 다이어리는 하나만
    // @JoinColumn(name = "diaryID") // 외부키 references from diaryID
    // private Diary diary;
    
    @OneToOne // 한개의 프롬포트는 하나만
    @JoinColumn(name = "promptID") // 외부키 references from promptID
    private Prompt prompt;

    

    @Builder
    public Image(String imageFile, Prompt prompt){
        this.imageFile = imageFile;
        this.prompt = prompt;
    }

    public void update(String imageFile, Prompt prompt){
        this.imageFile = imageFile;
        this.prompt = prompt;
    }
    
}
