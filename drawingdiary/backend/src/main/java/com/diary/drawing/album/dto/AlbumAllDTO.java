package com.diary.drawing.album.dto;

import java.util.List;

import com.diary.drawing.diary.dto.ImageForAlbumDTO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumAllDTO {
    private Long albumID;
    private String name;
    private List<ImageForAlbumDTO> images;


}
