package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateDiaryRequestDTO {
    private LocalDate date;
    private Long memberID;
}
