package com.diary.drawing.user.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.dto.MemberDTO;
import com.diary.drawing.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    // DB와 연결(의존성 주입)

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // 회원 가입 (예외처리 나중에)
    @Override
    public Member joinMember(MemberDTO memberDTO) throws IOException {

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

    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    // 체크용 예비 만들기.. 지워도 될듯
    // private static final String EXISTING_EMAIL = "test@test.com";
    // @Override
    // public Optional<Member> findbyEmail(String email) {
    //     if (! EXISTING_EMAIL.equalsIgnoreCase(email)) return Optional.empty();
    //     return

    // }


    // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    //     // 여기서 받은 유저 패스워드와 비교하여 로그인 인증한다
        
    // }

    


    
}
