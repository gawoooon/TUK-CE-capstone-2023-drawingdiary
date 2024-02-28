package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

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
public class FinalDIaryRequestDTO {
    private String text;
    private String weather;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Long albumID;
    private String styleName;
    private String imageFile;
    private String sentiment;
    private String comment;

    
}
