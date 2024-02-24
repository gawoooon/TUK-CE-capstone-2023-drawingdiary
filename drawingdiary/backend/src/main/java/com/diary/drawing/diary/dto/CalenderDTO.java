package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CalenderDTO {
    @Valid

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotNull
    private String imageFile;

    private String text;


    public CalenderDTO(LocalDate date, String imageFile, String text){
        this.date = date;
        this.imageFile = imageFile;
        this.text = text;
    }

}
