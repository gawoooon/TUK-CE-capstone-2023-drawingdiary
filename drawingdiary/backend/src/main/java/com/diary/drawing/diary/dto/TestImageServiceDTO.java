package com.diary.drawing.diary.dto;

import java.time.LocalDate;

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
public class TestImageServiceDTO {
    @Valid

    private String imageFile;

    private Long albumID;

    private LocalDate date;
}
