package com.diary.drawing.diary.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.diary.drawing.sentiment.dto.SentimentDTO.Confidence;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Builder
public class FinalDiaryRequestDTO {

    @Size(min=1, max=300, message = "일기는 1자에서 300자 사이로 입력해주세요")
    private String text;

    @NotNull(message = "날씨가 전송되지 않았습니다.")
    private String weather;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "날짜가 전송되지 않았습니다.")
    private LocalDate date;

    @NotNull(message = "앨범 ID가 전송되지 않았습니다.")
    private Long albumID;

    @NotNull(message = "이미지 스타일 이름이 전송되지 않았습니다.")
    private String styleName;   // 받아올때 이름으로

    @NotNull(message = "이미지 파일이 전송되지 않았습니다.")
    private String imageFile;

    @NotNull(message = "positive/netural/negative 요소가 전송되지 않았습니다.")
    private Confidence confidence;

    @NotNull(message = "코멘트가 전송되지 않았습니다.")
    private String comment;

    
}
