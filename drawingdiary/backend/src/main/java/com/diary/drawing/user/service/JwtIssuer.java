package com.diary.drawing.user.service;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtIssuer{

    private final JwtProperties properties;

    public String issue(Long userID, String email, List<String> role){
        return JWT.create()
                .withSubject(String.valueOf(userID))
                .withExpiresAt(Instant.now().plus(Duration.of(1, ChronoUnit.DAYS))) // 1일로 토큰 refresh
                .withClaim("e", email)
                .withClaim("a", role)
                .sign(Algorithm.HMAC256(properties.getSecretKey())); // 테스트 버전이라 시크릿키 대충
    }
}
