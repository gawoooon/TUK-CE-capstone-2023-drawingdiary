package com.diary.drawing.jwt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDTO{
    private final String accessToken;
    private final Long memberID;
}