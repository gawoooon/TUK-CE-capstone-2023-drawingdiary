package com.diary.drawing.diary.domain;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.comment.Comment;
import com.diary.drawing.common.BaseTime;
import com.diary.drawing.diary.dto.DiaryRequestDTO;
import com.diary.drawing.diary.dto.FinalDiaryRequestDTO;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.sentiment.domain.Sentiment;
import com.diary.drawing.user.domain.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Diary")
public class Diary extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryID;

    @Column(length = 300)
    private String text;

    @Enumerated(EnumType.STRING)
    private Weather weather;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 다이어리와 하나의 인물
    @JoinColumn(name = "memberID") // 외부키 references from memberid
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 다이어리와 하나의 스타일
    @JoinColumn(name = "styleID", nullable = true) // 외부키 references from styleID
    private ImageStyle imageStyle;

    @OneToOne  // 다이어리 하나에 하나의 이미지
    @JoinColumn(name = "imageID", nullable = true) // 외부키 references from imageid
    private Image image;

    @OneToOne  // 다이어리 하나에 한개 감정
    @JoinColumn(name = "sentimentID", nullable = true) // 외부키 references from sentimentid
    private Sentiment sentiment;

    @OneToOne  // 다이어리 하나에 한개 코멘트
    @JoinColumn(name = "commentID", nullable = true) // 외부키 references from commentid
    private Comment comment;

    

    @Builder
    public Diary(String text, String weather, LocalDate date, Member member,
                ImageStyle imageStyle, Image image, Sentiment sentiment, Comment comment){
        this.text = text;
        this.weather=Weather.valueOf(weather);
        this.date=date;
        this.member=member;
        this.imageStyle=imageStyle;
        this.image = image;
        this.sentiment = sentiment;
        this.comment = comment;
    }

    public Diary update(FinalDiaryRequestDTO dto, ImageStyle imageStyle){
        this.text=dto.getText();
        this.weather= Weather.valueOf(dto.getWeather());
        this.imageStyle=imageStyle;
        return this;
    }

    public Diary testUpdate(DiaryRequestDTO dto, ImageStyle imageStyle){
        this.text=dto.getText();
        this.weather= Weather.valueOf(dto.getWeather());
        this.imageStyle=imageStyle;
        return this;
    }

    // 문자열로 weather 주기
    public String getWeather(){
        return this.weather.name();
    }

}
