package com.diary.drawing.domain.user.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.GetMemberDTO;
import com.diary.drawing.domain.user.dto.MemberDTO;
import com.diary.drawing.domain.user.dto.MemberJoinDTO;

public interface MemberService {
    
    public Member joinMember(MemberJoinDTO memberDTO) throws Exception; //회원가입
    public void joinMemberPersonality(Member member, String personality); //회원가입시 성격 선택

    public Optional<Member> findByEmail(String email); //이메일로 멤버 찾기
    public ResponseEntity<?> findEmailByPhoneNumber(String phoneNumber, String code);

    public  String getEmailByMemberID(Long memberID);
    public GetMemberDTO getMember(Long memberID);

    public void updatePassword(Member targetMember, String oldpassword, String newpassword);
    public void updateEmail(Member targetMember, String newemail);
    public void updatePhoneNumber(Member targetMember, String newPhoneNumber);
    public void updateName(Member targetMember, String newname);
    public ResponseEntity<?> patchMypage(Long memberID,
                            MemberDTO.NameUpdate nameDTO,
                            MemberDTO.EmailUpdate emailDTO,
                            MemberDTO.PasswordUpdate passwordDTO,
                            MemberDTO.PhoneNumberUpdate phoneNumberDTO);

    public String sendSms(String phoneNumber);
}
