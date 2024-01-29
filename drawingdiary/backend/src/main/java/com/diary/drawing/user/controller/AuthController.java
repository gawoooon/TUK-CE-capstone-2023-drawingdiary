package com.diary.drawing.user.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.user.domain.LoginRequest;
import com.diary.drawing.user.domain.LoginResponse;
import com.diary.drawing.user.service.JwtIssuer;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@Tag(name = "Auth", description = "Auth API")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtIssuer jwtIssuer;  // 죄종적인 값이므로 final 자동 생성자 RequiredArgsConstructor


    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody @Validated LoginRequest request){
        var token = jwtIssuer.issue(1L, request.getEmail(), List.of("USER"));
        return LoginResponse.builder()
            .accessToken(token)
            .build();
    }
    
    
}
