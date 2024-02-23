package com.diary.drawing.diary.dto;

import com.diary.drawing.diary.domain.Date;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class ImageForAlbumDTO {
    private Long imageID;
    private String imageFile;
    private Date date;
    private Long diaryID;

    public ImageForAlbumDTO(Long imageID, String imageFile, Date date, Long diaryID){
        this.imageID = imageID;
        this.imageFile = imageFile;
        this.date = date;
        this.diaryID = diaryID;
    }

}
