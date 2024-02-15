package com.diary.drawing.comment;

import com.diary.drawing.diary.domain.Diary;

import jakarta.persistence.Column;
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
@Table(name = "Comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentID;

    @OneToOne  // 한개의 다이어리는 하나만
    @JoinColumn(name = "diaryID") // 외부키 references from diaryID
    private Diary diary;

    @Column(length = 2000)
    private String comment;

    @Builder
    public Comment(Diary diary, String comment){
        this.diary = diary;
        this.comment = comment;
    }

}
