package com.diary.drawing.domain.user.service;

import java.io.IOException;
import java.util.Optional;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.GetMemberDTO;
import com.diary.drawing.domain.user.dto.MemberDTO;
import com.diary.drawing.domain.user.dto.MemberJoinDTO;
import com.diary.drawing.domain.user.dto.PhoneResponseDTO;
import com.diary.drawing.domain.user.exception.MemberExceptionType;
import com.diary.drawing.domain.user.exception.MemberResponseException;
import com.diary.drawing.domain.user.repository.MemberRepository;
import com.diary.drawing.global.util.SmsUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    // DB와 연결(의존성 주입)

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ValidateMemberService validateMemberService;
    private final SmsUtil smsUtil;
    private final SmsVerificationService smsVerificationService;

    // 회원 가입 (예외처리 나중에)
    @Override
    public Member joinMember(MemberJoinDTO memberDTO) throws IOException {

        // 암호화
        String rawPassword = memberDTO.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        

        // 생성
        Member member = Member.builder()
                .name(memberDTO.getName())
                .email(memberDTO.getEmail())
                .password(encPassword)
                .birth(memberDTO.getBirth())
                .gender(memberDTO.getGender())
                .build();
        
        return memberRepository.save(member);
    }

    // 회원가입시 성격 저장하는 메소드
    @Transactional
    @Override
    public void joinMemberPersonality(Member member, String personality){
        member.setPersonality(personality);
        memberRepository.save(member); // [지원 수정 부분]
    }

    // 이메일로 멤버 찾기
    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    // 아이디로 이메일 찾기
    @Override
    public String getEmailByMemberID(Long memberID) {
        return memberRepository.findEmailByMemberID(memberID);
    }


    @Override
    public GetMemberDTO getMember(Long memberID){
        Member targetMemeber = validateMemberService.validateMember(memberID);
        GetMemberDTO getMemberDTO = GetMemberDTO.builder()
            .memberID(targetMemeber.getMemberID())
            .name(targetMemeber.getName())
            .email(targetMemeber.getEmail())
            .birth(targetMemeber.getBirth())
            .gender(targetMemeber.getGender())
            .personality(targetMemeber.getPersonality())
            .profileImage(targetMemeber.getProfileImage())  // 임시 url 넣기
            .theme(targetMemeber.getTheme())
            .phoneNumber(targetMemeber.getPhoneNumber())
            .build();
        return getMemberDTO;
    }

    // // 프로필 사진 변경
    // @Transactional
    // @Override
    // public void updateProfileImage(Long memberID, String profileimage){
    //     Member targetMemeber = validateMemberService.validateMember(memberID);

    // }

    
    // nickname 업데이트
    @Transactional
    @Override
    public void updateName(Member targetMember, String newname){
        targetMember.updateName(newname);
        memberRepository.save(targetMember);
    }


    // email 업데이트
    @Transactional
    @Override
    public void updateEmail(Member targetMember, String newemail){
        targetMember.updateEmail(newemail);
        memberRepository.save(targetMember);
    }


    // password 업데이트
    @Transactional
    @Override
    public void updatePassword(Member targetMember, String oldpassword, String newpassword){
        if(!bCryptPasswordEncoder.matches(oldpassword, targetMember.getPassword())){
            throw new MemberResponseException(MemberExceptionType.WRONG_PASSWORD);}
        String encPassword = bCryptPasswordEncoder.encode(newpassword);
        targetMember.updatePassword(encPassword);
        memberRepository.save(targetMember);
    }

    // phoneNumber 업데이트
    @Transactional
    @Override
    public void updatePhoneNumber(Member targetMember, String newPhoneNumber){
        targetMember.updatePhoneNumber(newPhoneNumber);
        memberRepository.save(targetMember);
    }

    // patch로 마이페이지 개인정보 수정
    // TODO: 아직 patch null 처리랑 오류 잡기 안함
    @Transactional
    @Override
    public ResponseEntity<?> patchMypage(Long memberID,
                            MemberDTO.NameUpdate nameDTO,
                            MemberDTO.EmailUpdate emailDTO,
                            MemberDTO.PasswordUpdate passwordDTO,
                            MemberDTO.PhoneNumberUpdate phoneNumberDTO){
        Member targetMemeber = validateMemberService.validateMember(memberID);
        updateEmail(targetMemeber, emailDTO.getNewEmail());
        updateName(targetMemeber, nameDTO.getNewName());
        updatePassword(targetMemeber, passwordDTO.getOldPassword(), passwordDTO.getNewPassword());
        updatePhoneNumber(targetMemeber, phoneNumberDTO.getPhoneNumber());
        memberRepository.save(targetMemeber);
        return ResponseEntity.ok("마이페이지 변경이 완료되었습니다");
    }


    // 전화번호 인증
    public String sendSms(String phoneNumber){
        Member targetMemeber = memberRepository.findByPhoneNumber(phoneNumber).orElseThrow(()->
                new MemberResponseException(MemberExceptionType.NOT_FOUND_MEMBER));
        
        //String receiverEmail = targetMemeber.getEmail();
        String verificationCode = createKey();
        smsUtil.sendOne(phoneNumber, verificationCode);

        return verificationCode;
    }

        // 인증번호 만드는 메소드
    public static String createKey(){
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        for (int i=0; i<6; i++){    // 6자리
            key.append(random.nextInt(10)); //0~9까지 랜덤 생성
        }
        return key.toString();
    }

        // 이메일 찾아서 반환
    public ResponseEntity<?> findEmailByPhoneNumber(String phoneNumber, String code){

        if(smsVerificationService.verifyNumber(phoneNumber, code)){
            Member targetMember = memberRepository.findByPhoneNumber(phoneNumber).orElseThrow(()-> new MemberResponseException(MemberExceptionType.NOT_FOUND_MEMBER));
            PhoneResponseDTO responseDTO = new PhoneResponseDTO(targetMember.getEmail());
            return ResponseEntity.ok(responseDTO);
        } else{
            throw new MemberResponseException(MemberExceptionType.NOT_FOUND_MEMBER);
        }
    }




    


    
}
