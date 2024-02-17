package com.diary.drawing.diary.domain;

import java.sql.Timestamp;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.comment.Comment;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.sentiment.Sentiment;
import com.diary.drawing.user.domain.Member;

import jakarta.persistence.Column;
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
@Table(name = "Diary")
public class Diary{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryID;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private Timestamp record;

    @Column(length = 5000)
    private String text;

    // 이후 enum으로 바뀔 수 있음
    private String weather;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 다이어리 한개의 날짜
    @JoinColumn(name = "dateID") // 외부키 references from diaryid
    private Date date;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러 다이어리와 하나의 앨범
    @JoinColumn(name = "albumID", nullable = true) // 외부키 references from albumid
    private Album album;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 다이어리와 하나의 인물
    @JoinColumn(name = "memberID") // 외부키 references from memberid
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)  // 여러개의 다이어리와 하나의 스타일
    @JoinColumn(name = "styleID") // 외부키 references from styleID
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
    public Diary(String text, String weather, Date date, Album album, Member member, ImageStyle imageStyle){
        this.record = new Timestamp(System.currentTimeMillis());
        this.text = text;
        this.weather=weather;
        this.date=date;
        this.album=album;
        this.member=member;
        this.imageStyle=imageStyle;
        this.image = null;
        this.sentiment = null;
        this.comment = null;
    }
}
