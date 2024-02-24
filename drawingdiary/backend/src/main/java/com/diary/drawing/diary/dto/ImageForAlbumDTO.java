package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class ImageForAlbumDTO {
    private Long imageID;
    private String imageFile;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private Long diaryID;

    public ImageForAlbumDTO(Long imageID, String imageFile, LocalDate date, Long diaryID){
        this.imageID = imageID;
        this.imageFile = imageFile;
        this.date = date;
        this.diaryID = diaryID;
    }

}
