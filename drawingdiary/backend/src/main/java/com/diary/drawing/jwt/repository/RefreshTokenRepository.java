package com.diary.drawing.jwt.repository;

import org.springframework.data.repository.CrudRepository;

import com.diary.drawing.jwt.domain.RefreshToken;


public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String>{
    RefreshToken findByMemberID(String memberID);
    
}
