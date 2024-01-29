package com.diary.drawing.user.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.user.domain.LoginRequest;
import com.diary.drawing.user.domain.LoginResponse;
import com.diary.drawing.user.domain.PrincipalDetails;
import com.diary.drawing.user.service.JwtIssuer;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@Tag(name = "Auth", description = "Auth API")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtIssuer jwtIssuer;  // 죄종적인 값이므로 final 자동 생성자 RequiredArgsConstructor
    private final AuthenticationManager authenticationManager;

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        // 1. 사용자 인증 (로그인 요청할때 secrity를 통함)
        // token 객체를 인자로 받음
        var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken((request.getEmail()), request.getPassword())
        );
        var principalDetails = (PrincipalDetails) authentication.getPrincipal();

        var roles = principalDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.issue(principalDetails.getMemberId(), principalDetails.getEmail(), roles);
        return LoginResponse.builder()
            .accessToken(token)
            .build();
    }

    @PostMapping("/auth/checking")
    public String check(@RequestBody @Validated LoginRequest request){
        
        return request.getEmail() + request.getPassword();
    }
    
    
}
