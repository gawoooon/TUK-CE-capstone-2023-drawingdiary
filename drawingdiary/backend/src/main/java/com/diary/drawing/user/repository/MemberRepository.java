package com.diary.drawing.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.diary.drawing.user.domain.Member;


@Repository
public interface MemberRepository extends JpaRepository<Member, Long>{
    public Member findByEmail(String Email);
    boolean existsByEmail(String email);
}