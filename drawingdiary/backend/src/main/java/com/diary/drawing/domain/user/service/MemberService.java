package com.diary.drawing.domain.user.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.GetMemberDTO;
import com.diary.drawing.domain.user.dto.MemberDTO;
import com.diary.drawing.domain.user.dto.MemberJoinDTO;
import com.diary.drawing.domain.user.dto.PhoneDTO.responseNewDTO;

public interface MemberService {
    
    public Member joinMember(MemberJoinDTO memberDTO) throws Exception; //회원가입

    public Optional<Member> findByEmail(String email); //이메일로 멤버 찾기
    public ResponseEntity<?> verifyExistedPhoneNumber(String phoneNumber, String code);
    public ResponseEntity<responseNewDTO> verifyNewPhoneNumber(String phoneNumber, String code);

    public  String getEmailByMemberID(Long memberID);
    public GetMemberDTO getMember(Long memberID);

    public ResponseEntity<?> validatePassword(Long memberID, MemberDTO.passwordCheck passwordDTO);

    public void updatePassword(Member targetMember, String oldpassword, String newpassword);
    public void updateProfileImage(Member targetMember, String profileimage) throws IOException;
    public ResponseEntity<?> patchMypage(Long memberID, MemberDTO.MemberUpdate memberDTO);

    public String sendSmsNew(String phoneNumber);
    public String sendSmsExisted(String phoneNumber);
    public ResponseEntity<?> setTempPassword(String email) throws Exception;

}
