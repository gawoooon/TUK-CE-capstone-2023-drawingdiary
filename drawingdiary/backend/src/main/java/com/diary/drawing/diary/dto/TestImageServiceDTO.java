package com.diary.drawing.diary.dto;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class TestImageServiceDTO {
    @Valid

    private String imageFile;

    private Long diaryID;

    private Long promptID;
}
