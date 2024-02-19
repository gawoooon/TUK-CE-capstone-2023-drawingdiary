package com.diary.drawing.album.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class AlbumListDTO {
    private Long albumID;
    private String albumName;

    public AlbumListDTO(Long albumID, String albumName) {
        this.albumID = albumID;
        this.albumName = albumName;
    }
}
