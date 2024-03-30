package com.diary.drawing.domain.user.dto;

import jakarta.validation.Valid;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class ThemeUpdateDTO {

    @Valid

    private int theme;
}
