package com.diary.drawing.domain.email;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final RedisTemplate<String, String> redisTemplate;

    private static final String VERIFICATION_CODE_KEY_PREFIX = "email-verification-code:";

    // 코드 저장하는 시간 5분
    public void saveVerificationCode(String email, String originVerificationCode){
        String key = VERIFICATION_CODE_KEY_PREFIX + email;
        redisTemplate.opsForValue().set(key, originVerificationCode, 5, TimeUnit.MINUTES);
    }

    // 코드 확인해서 맞으면 true 아니면 false
    public boolean verifyEmail(String email, String verificaStringCode){
        String key = VERIFICATION_CODE_KEY_PREFIX + email;
        String savedCode = redisTemplate.opsForValue().get(key);

        // 저장된 코드 널값 아니고 origin이랑 일치하면
        if(savedCode != null && savedCode.equals(verificaStringCode)){
            redisTemplate.delete(key);  //redisTemplate = 값을 조작하는 메서드
            return true;
        }
        // 아니면 false
        return false;
    }
    
    
}
