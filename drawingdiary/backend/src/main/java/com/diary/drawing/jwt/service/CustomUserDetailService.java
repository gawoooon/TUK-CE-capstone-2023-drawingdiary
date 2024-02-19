package com.diary.drawing.jwt.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.diary.drawing.jwt.model.PrincipalDetails;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService{
    
    private final MemberRepository memberRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        
        // 못찾으면 Exception, var 형으로 정의되어 있었음
        Member member = memberRepository.findByEmail(username).orElseThrow();

        return PrincipalDetails.builder()
            .memberID(member.getMemberID())
            .email(member.getEmail())
            .authorities(List.of(new SimpleGrantedAuthority(member.getRole())))
            .password(member.getPassword())
            .build();
    }
}
