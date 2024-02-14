package com.diary.drawing.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.jwt.model.PrincipalDetails;
import com.diary.drawing.user.dto.MemberDTO;
import com.diary.drawing.user.exception.MemberExceptionType;
import com.diary.drawing.user.exception.MemberResponseException;
import com.diary.drawing.user.repository.MemberRepository;
import com.diary.drawing.user.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;





@Tag(name = "User", description = "User API")
@RestController
@RequestMapping("/api")

public class MemberController {
    @Autowired
    private MemberService memberService;
    private MemberRepository memberRepository;

    // 통신 체크
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello!");
    }

    // post 체크
    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody String body) {
        // 요청 본문을 처리하는 코드를 여기에 작성하세요.
        return ResponseEntity.ok("Received: " + body);
    }

    // 로그인은 jwt AuthController 에 구현되어있음


    // 로그인 되어있는 경우 해당 사용자 정보 반환하는 api
    // @AuthenticationPrincipal principal 정보 가져옴
    // TODO: 정보 가져오게
    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal PrincipalDetails principalDetails){
        if (principalDetails != null) {
            return "IF you see this. then youre logged in " + principalDetails.getEmail()
                        + "User ID: " + principalDetails.getMemberId();
        } else {
            // handle the case where principalDetails is null
            return "User is not logged in.";
        }
    }
    
    // 회원가입 token 안쓰길래 여기에 구현
    // 검증을 위한 valid 추가
    //https://ttl-blog.tistory.com/290 참고
    @Operation(summary = "회원가입", description = "말그대로 그냥 회원가입")
    @PostMapping("/join")
    public void add(@Valid @RequestBody MemberDTO memberDTO) throws Exception{
        if (memberRepository.existsByEmail(memberDTO.getEmail())){
            throw new MemberResponseException(MemberExceptionType.ALREADY_EXIST_EMAIL);
        }
        
        // 만약 이메일 인증번호가 옳지 않다면~~~ 못넘어감
        memberService.joinMember(memberDTO);
    }
    
    


}