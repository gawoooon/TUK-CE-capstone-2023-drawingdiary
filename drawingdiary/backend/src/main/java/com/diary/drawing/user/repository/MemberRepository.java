package com.diary.drawing.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.user.domain.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{
    public Optional<Member> findByEmail(String email); // Optional: findBy로 조회했을 때 객체가 존재하지 않는 경우 처리
    boolean existsByEmail(String email);
}