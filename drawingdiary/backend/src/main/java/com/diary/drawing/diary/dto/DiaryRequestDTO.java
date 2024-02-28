package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/* 삭제예정 */

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class DiaryRequestDTO {

    @Valid


    @Size(min=1, max=300, message = "일기는 1자에서 300자 사이로 입력해주세요")
    private String text;

    // 이후 enum으로 바뀔 수 있음
    @NotNull(message = "날씨가 전송되지 않았습니다.")
    private String weather;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "날짜가 전송되지 않았습니다.")
    private LocalDate date;

    private Long albumID;   // null 가능

    @NotNull(message = "고객 ID가 전송되지 않았습니다.")
    private Long memberID;

    @NotNull(message = "이미지 스타일이 전송되지 않았습니다.")
    private Long styleID;
}
