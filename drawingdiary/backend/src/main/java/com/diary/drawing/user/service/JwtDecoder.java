package com.diary.drawing.user.service;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtDecorder {

    private final JwtProperties properties;

    public DecodedJWT decode(String token){
        return JWT.require(Algorithm.HMAC256(properties.getSecretKey()))

                .build()
                .verify(token);
    }
}
