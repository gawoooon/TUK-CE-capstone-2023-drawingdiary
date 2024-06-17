package com.diary.drawing.global.jwt.security;

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

    // access token
    public String createAccessToken(Long memberID, String email, List<String> roles){
        return JWT.create()
                .withSubject(String.valueOf(memberID))
                .withExpiresAt(Instant.now().plus(Duration.of(1, ChronoUnit.MINUTES))) // 토큰을 20분으로 제한
                .withClaim("e", email)
                .withClaim("a", roles)
                .sign(Algorithm.HMAC256(properties.getSecretKey())); // 테스트 버전이라 시크릿키 대충
    }

    // refresh token
    public String createRefreshToken(Long memberID, String email, List<String> roles){
        return JWT.create()
                .withSubject(String.valueOf(memberID))
                .withExpiresAt(Instant.now().plus(Duration.of(2, ChronoUnit.DAYS))) // 토큰을 1일로 제한
                .withClaim("e", email)
                .withClaim("a", roles)
                .sign(Algorithm.HMAC256(properties.getSecretKey())); // 테스트 버전이라 시크릿키 대충
    }


    

    
}
