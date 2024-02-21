package com.diary.drawing.jwt.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.jwt.domain.RefreshToken;


@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long>{
    Optional<RefreshToken> findById(@SuppressWarnings("null") Long id);
}
