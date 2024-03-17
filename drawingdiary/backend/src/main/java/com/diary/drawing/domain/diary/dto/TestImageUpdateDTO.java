package com.diary.drawing.domain.diary.dto;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class TestImageUpdateDTO  {
    @Valid

    private String imageFile;

    private Long albumID;

    private Long imageID;
}
