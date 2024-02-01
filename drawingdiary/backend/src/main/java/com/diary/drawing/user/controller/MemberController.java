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
import com.diary.drawing.user.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;






@Tag(name = "User", description = "User API")
@RestController
@RequestMapping("/api")

public class MemberController {
    @Autowired
    private MemberService memberService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello!");
    }

    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody String body) {
        // 요청 본문을 처리하는 코드를 여기에 작성하세요.
        return ResponseEntity.ok("Received: " + body);
    }


    
    //로그인 되어 있는지 확인하는 api
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
    
    
    @Operation(summary = "회원가입", description = "말그대로 그냥 회원가입")
    @PostMapping("/join")
    public String add(@RequestBody MemberDTO memberDTO) throws Exception{
        // 만약 이메일 인증번호가 옳지 않다면~~~ 못넘어감
        memberService.joinMember(memberDTO);
        return "회원가입 완료";

    }
    
    


}
