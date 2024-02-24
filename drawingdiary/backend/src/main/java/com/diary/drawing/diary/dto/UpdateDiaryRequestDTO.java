package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.imagestyle.domain.ImageStyle;
import com.diary.drawing.user.domain.Member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class UpdateDiaryRequestDTO {
    private String text;
    private String weather;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Album album;
    private Member member;
    private ImageStyle imageStyle;

    
}
