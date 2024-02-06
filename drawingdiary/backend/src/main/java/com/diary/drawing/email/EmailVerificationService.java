package com.diary.drawing.email;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class VerificationService {

    private final RedisTemplate<String, String> redisTemplate;

    private static final String VERIFICATION_CODE_KEY_PREFIX = "verification-code:";

    public void saveVerificationCode(String email, String verificationCode){
        String key = VERIFICATION_CODE_KEY_PREFIX + email;
        redisTemplate.opsForValue().set(key, verificationCode, 5, TimeUnit.MINUTES);
    }
    
    
}
