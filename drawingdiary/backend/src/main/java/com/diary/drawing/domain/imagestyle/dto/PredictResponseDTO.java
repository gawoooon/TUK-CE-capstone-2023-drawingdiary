package com.diary.drawing.domain.imagestyle.dto;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class PredictResponseDTO {
    private List<String> top_styles;
}
