package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.sentiment.dto.SentimentDTO.Confidence;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
public class FinalDiaryRequestDTO {
    private String text;
    private String weather;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Long albumID;
    private String styleName;   // 받아올때 이름으로
    private String imageFile;
    private Confidence confidence;
    private String comment;

    
}
