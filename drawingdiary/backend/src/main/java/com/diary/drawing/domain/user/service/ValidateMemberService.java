package com.diary.drawing.domain.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.exception.MemberExceptionType;
import com.diary.drawing.domain.user.exception.MemberResponseException;
import com.diary.drawing.domain.user.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ValidateMemberService {

    private final MemberRepository memberRepository;

    public Member validateMember(Long memberID){
        Optional<Member> member = memberRepository.findByMemberID(memberID);
        if(member.isPresent()) return member.get();
        else{ throw new MemberResponseException(MemberExceptionType.NOT_FOUND_MEMBER);}
    }
    
}
