package com.diary.drawing.global.jwt.security;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.diary.drawing.global.jwt.service.AuthService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtDecoder {

    private final JwtProperties properties;
    private final AuthService authService;
    private final RedisTemplate<String, String> redisTemplate;
    private static final String BLACKLIST_PREFIX = "blacklist:";

    public DecodedJWT decode(String token){
        return JWT.require(Algorithm.HMAC256(properties.getSecretKey()))
                .build()
                .verify(token);
    }

    
    public boolean isTokenExpired(String token) {
        // 1. 토큰이 만료되지 않음
        if(token != null && authService.validateToken(token)){
            
            // 2. Redis에서 로그아웃 확인
            String key = BLACKLIST_PREFIX + token;
            String isLogout = (String)redisTemplate.opsForValue().get(key);
    
            // 없는 경우 정상, false
            if(ObjectUtils.isEmpty(isLogout)){
                return false;
            } else{
                // 로그아웃한 경우 true
                return true; 
            }
        } else{
            return true;
        }
    }
}
