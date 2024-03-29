package com.diary.drawing.domain.user.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.GetMemberDTO;
import com.diary.drawing.domain.user.dto.MemberJoinDTO;
import com.diary.drawing.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    // DB와 연결(의존성 주입)

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ValidateMemberService validateMemberService;

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
            .build();
        return getMemberDTO;
    }


    


    
}
