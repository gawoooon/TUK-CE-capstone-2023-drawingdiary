package com.diary.drawing.domain.diary.dto;

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
public class TestImageS3DTO {

    @Valid

    private String imageFile;

    private LocalDate date;

}
