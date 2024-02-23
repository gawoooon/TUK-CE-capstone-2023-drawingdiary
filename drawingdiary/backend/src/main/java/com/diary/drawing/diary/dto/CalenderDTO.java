package com.diary.drawing.diary.dto;

import java.sql.Date;

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
    private Date date;

    @NotNull
    private String imageFile;

    private String text;


    public CalenderDTO(Date date, String imageFile, String text){
        this.date = date;
        this.imageFile = imageFile;
        this.text = text;
    }

}
