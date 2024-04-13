package com.diary.drawing.domain.user.service;

import java.io.IOException;
import java.time.LocalDate;
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
import com.diary.drawing.global.s3.S3Uploader;
import com.diary.drawing.global.util.SmsUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    // DB와 연결(의존성 주입)

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ValidateMemberService validateMemberService;
    private final SmsUtil smsUtil;
    private final SmsVerificationService smsVerificationService;
    private final S3Uploader s3Uploader;

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

    // 테마 수정하는 메소드
    @Transactional
    @Override
    public ResponseEntity<?> updateTheme (Long memberID, int newTheme){
        Member targetMemeber = validateMemberService.validateMember(memberID);
        targetMemeber.updateTheme(newTheme);
        memberRepository.save(targetMemeber);
        return ResponseEntity.ok("테마 변경이 완료되었습니다.");
    }
    @Override
    public boolean validatePassword(Long memberID, MemberDTO.passwordCheck passwordDTO){
        Member targetMember = validateMemberService.validateMember(memberID);
        if(!bCryptPasswordEncoder.matches(passwordDTO.getOldPassword(), targetMember.getPassword())){
            throw new MemberResponseException(MemberExceptionType.WRONG_PASSWORD);
        }
        else {return true;}

    }

    // 프로필 사진 변경
    @Transactional
    @Override
    public void updateProfileImage(Member targetMember, String profileimage) {

        // 0. profileimage = '__NULL__' 이라면 프로필 이미지를 삭제하고 null 값이 된다.
        if(profileimage == "__NULL__"){
            String imageState = s3Uploader.deleteImage(targetMember.getProfileImage());
            targetMember.updateProfileImage(null);
            return;
        }

        // 1. 오늘 날짜 가져오기
        LocalDate today = LocalDate.now();

        // 2. s3 업로드
        try {
            String imageUrl = s3Uploader.uploadImage(profileimage, today, "p");
            // 3. update
            targetMember.updateProfileImage(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            throw new MemberResponseException(MemberExceptionType.ERROR_UPDATE_PROFILEIMAGE);
        }
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


    // patch로 마이페이지 개인정보 수정
    // TODO: patch의 null인지 실수로 보내지지 않았는지 구별 불가능
    @Transactional
    @Override
    public ResponseEntity<?> patchMypage(Long memberID, MemberDTO.MemberUpdate memberDTO){
        //1. 해당 멤버 객체
        Member targetMember = validateMemberService.validateMember(memberID);

        if(memberDTO.getNewEmail() != null) targetMember.updateEmail(memberDTO.getNewEmail());
        if(memberDTO.getNewName() != null) targetMember.updateName(memberDTO.getNewName());
        if (memberDTO.getNewPassword() != null && memberDTO.getOldPassword() != null) 
                                    updatePassword(targetMember, memberDTO.getOldPassword(), memberDTO.getNewPassword());
        if(memberDTO.getNewPhoneNumber() != null) targetMember.updatePhoneNumber(memberDTO.getNewPhoneNumber());
        if(memberDTO.getNewProfileImage() != null) updateProfileImage(targetMember, memberDTO.getNewProfileImage());
        memberRepository.save(targetMember);
        return ResponseEntity.ok("마이페이지 변경이 완료되었습니다");
    }


    // 전화번호 인증
    public String sendSms(String phoneNumber){
        // 1. 전화번호로 member 객체 찾고 나오지 않으면 오류
        Member targetMember = memberRepository.findByPhoneNumber(phoneNumber).orElseThrow(()->
                new MemberResponseException(MemberExceptionType.NOT_FOUND_MEMBER));
        
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
