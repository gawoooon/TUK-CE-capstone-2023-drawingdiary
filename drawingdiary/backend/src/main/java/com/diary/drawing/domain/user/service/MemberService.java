package com.diary.drawing.domain.user.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.GetMemberDTO;
import com.diary.drawing.domain.user.dto.MemberJoinDTO;

public interface MemberService {
    
    public Member joinMember(MemberJoinDTO memberDTO) throws Exception; //회원가입
    public void joinMemberPersonality(Member member, String personality); //회원가입시 성격 선택
    public  String getEmailByMemberID(Long memberID);
    public Optional<Member> findByEmail(String email); //이메일로 멤버 찾기
    public GetMemberDTO getMember(Long memberID);
    public ResponseEntity<?> updateTheme (Long memberID, int newTheme);
}
