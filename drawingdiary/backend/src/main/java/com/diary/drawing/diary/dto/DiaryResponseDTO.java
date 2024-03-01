package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.sentiment.domain.Sentiment;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class DiaryResponseDTO {
    private String text;
    private String weather;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Long albumID;
    private String albumName;
    private Long styleID;
    private String styleName;
    private String imageURL;
    private Sentiment sentiment;
    private String comment;

    public static DiaryResponseDTO from(Diary diary) {
        return DiaryResponseDTO.builder()
                .text(diary.getText())
                .weather(diary.getWeather())
                .date(diary.getDate())
                .albumID(diary.getImage().getAlbum().getAlbumID())
                .albumName(diary.getImage().getAlbum().getAlbumName())
                .styleID(diary.getImageStyle().getStyleID())
                .styleName(diary.getImageStyle().getStyleName())
                .imageURL(diary.getImage().getImageFile())
                .sentiment(diary.getSentiment())
                .comment(diary.getComment().getComment())
                .build();
    }
}

