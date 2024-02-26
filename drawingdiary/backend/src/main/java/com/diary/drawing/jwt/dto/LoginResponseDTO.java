package com.diary.drawing.jwt.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDTO{
    private final String accessToken;
    private final String refreshToken;
    private final Long memberID;
}