package com.diary.drawing.jwt.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.jwt.domain.RefreshToken;
import com.diary.drawing.jwt.repository.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    // 저장
    @Transactional
    public void saveToken(Long memberID, String refreshToken) {
        refreshTokenRepository.save(new RefreshToken(String.valueOf(memberID), refreshToken));
    }

    // 삭제
    @Transactional
    public void removeRefreshToken(Long userID) {
        refreshTokenRepository.findByUserID(String.valueOf(userID))
                .ifPresent(refreshToken -> refreshTokenRepository.delete(refreshToken));
    }
}