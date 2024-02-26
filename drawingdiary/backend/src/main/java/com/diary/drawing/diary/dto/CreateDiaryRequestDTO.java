package com.diary.drawing.diary.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateDiaryRequestDTO {
    private Date date;
    private Long memberID;
}
