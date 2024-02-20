package com.diary.drawing.jwt.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 24 * 1000L) // 토큰을 1일로 제한
public class RefreshToken {

    @Id
    private String memberID;

    private String refreshToken;


    // 생성자 추가
    public RefreshToken(String memberID, String refreshToken) {
        this.memberID = memberID;
        this.refreshToken = refreshToken;
    }
}
