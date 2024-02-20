package com.diary.drawing.jwt.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.diary.drawing.jwt.domain.RefreshToken;


public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String>{
    Optional<RefreshToken> findByUserID(String userID);
    
}
