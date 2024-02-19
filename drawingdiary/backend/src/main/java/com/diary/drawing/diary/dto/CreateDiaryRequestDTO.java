package com.diary.drawing.diary.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateDiaryRequestDTO {
    private Long dateID;
    private Long memberID;
}
