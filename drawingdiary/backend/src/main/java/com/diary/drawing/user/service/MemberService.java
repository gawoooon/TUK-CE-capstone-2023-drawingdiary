package com.diary.drawing.user.service;

import java.util.Optional;

import com.diary.drawing.user.domain.Member;

public interface MemberService {
    //회원가입
    public Member joinMember(Member member) throws Exception;
    public Optional<Member> findByEmail(String email);
}
