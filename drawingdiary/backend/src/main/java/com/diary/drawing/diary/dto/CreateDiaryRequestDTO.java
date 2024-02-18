package com.diary.drawing.diary.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateDiaryRequestDTO {

    @Valid

    // 불가능하면 빼버림
    @NotNull(message = "날씨가 전송되지 않았습니다.")
    private String weather;

    @NotNull(message = "날짜 ID가 전송되지 않았습니다.")
    private int dateID;

}