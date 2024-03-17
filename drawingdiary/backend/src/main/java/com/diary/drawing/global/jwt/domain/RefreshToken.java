package com.diary.drawing.global.jwt.domain;

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
    private Long id;
    
    private String refreshToken;

    public RefreshToken(final String refreshToken, final Long id) {
        this.refreshToken = refreshToken;
        this.id = id;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getId() {
        return id;
    }
}
