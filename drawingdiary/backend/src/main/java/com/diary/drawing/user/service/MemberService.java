package com.diary.drawing.user.service;

import java.util.Optional;

import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.dto.MemberDTO;

public interface MemberService {
    
    public Member joinMember(MemberDTO memberDTO) throws Exception; //회원가입
    public void joinMemberPersonality(Member member, String personality); //회원가입시 성격 선택
    public  String getEmailByMemberID(Long memberID);
    public Optional<Member> findByEmail(String email); //이메일로 멤버 찾기
    public Member validateMember(Long memberID);
}
