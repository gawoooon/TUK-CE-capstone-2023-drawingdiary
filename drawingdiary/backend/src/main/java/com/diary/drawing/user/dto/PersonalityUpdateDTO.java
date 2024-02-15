package com.diary.drawing.user.dto;

import jakarta.validation.Valid;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class PersonalityUpdateDTO {

    @Valid

    private String email;
    private String personality;
}
