package com.diary.drawing.domain.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.domain.album.domain.Album;
import com.diary.drawing.domain.imagestyle.domain.ImageStyle;
import com.diary.drawing.domain.user.domain.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
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
