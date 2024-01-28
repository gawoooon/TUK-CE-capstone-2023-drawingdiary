package com.diary.drawing.user.domain;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter

public class LoginRequest{
    private String email;
    private String password;
}