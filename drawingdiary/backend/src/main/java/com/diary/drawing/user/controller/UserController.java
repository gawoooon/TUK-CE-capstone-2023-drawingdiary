package com.diary.drawing.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.user.domain.PrincipalDetails;
import com.diary.drawing.user.domain.User;
import com.diary.drawing.user.service.PrincipalDetailsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;





@Tag(name = "User", description = "User API")
@RestController
@RequestMapping("/api")

public class UserController {
    @Autowired
    private PrincipalDetailsService principalDetailsService;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello!");
    }
    
    
    @Operation(summary = "회원가입", description = "말그대로 그냥 회원가입")
    @PostMapping("/join")
    public String add(@RequestBody User user){
        principalDetailsService.joinUser(user);
        return "회원가입 완료";

    }

    @Operation(summary = "로그인", description = "입력방식으로 로그인")
    @GetMapping("/login")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails : " + principalDetails.getUser());
        return "user";
    }
    
    


}
