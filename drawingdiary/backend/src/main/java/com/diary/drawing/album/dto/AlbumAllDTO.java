package com.diary.drawing.album.dto;

import java.util.List;

import com.diary.drawing.diary.dto.ImageForAlbumDTO;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;


@Getter
@ToString
@RequiredArgsConstructor
public class AlbumAllDTO {
    private Long albumID;
    private String name;
    private List<ImageForAlbumDTO> images;

    public AlbumAllDTO(Long albumID, String name, List<ImageForAlbumDTO> images){
        this.albumID = albumID;
        this.name = name;
        this.images = images;
    }

}
