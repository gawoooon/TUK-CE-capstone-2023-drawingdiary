package com.diary.drawing.global.jwt.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.global.jwt.domain.RefreshToken;


@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long>{
    Optional<RefreshToken> findById(@SuppressWarnings("null") Long id);
}
