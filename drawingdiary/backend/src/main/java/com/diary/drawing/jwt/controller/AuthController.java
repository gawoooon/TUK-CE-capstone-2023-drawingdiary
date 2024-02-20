package com.diary.drawing.jwt.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.jwt.domain.PrincipalDetails;
import com.diary.drawing.jwt.dto.LoginRequestDTO;
import com.diary.drawing.jwt.dto.LoginResponseDTO;
import com.diary.drawing.jwt.security.JwtIssuer;
import com.diary.drawing.jwt.service.RefreshTokenService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@Tag(name = "Auth", description = "Auth API")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtIssuer jwtIssuer;  // 최종적인 값이므로 final 자동 생성자 RequiredArgsConstructor
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;


    /* 로그인 */
    @PostMapping("/auth/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request){
        // 1. 사용자 인증 (로그인 요청할때 security를 통함)
        // token 객체를 인자로 받음
        var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken((request.getEmail()), request.getPassword())
        );
        // 2. 인증된 사용자의 세부 정보 가져오기
        // Authentication 객체의 getPrincipal 메소드를 통해 인증된 사용자의 세부 정보 get
        var principalDetails = (PrincipalDetails) authentication.getPrincipal();

        // 3. 사용자 권한 가져오기
        var roles = principalDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // 4. jwt 토큰 발급
        String accessToken = jwtIssuer.createAccessToken(principalDetails.getMemberID(), principalDetails.getEmail(), roles);
        String refreshToken = jwtIssuer.createAccessToken(principalDetails.getMemberID(), principalDetails.getEmail(), roles);

        // 5. 발급받은 refreshToken은 redis에 저장
        refreshTokenService.saveToken(principalDetails.getMemberID(), refreshToken);

        return LoginResponseDTO.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .memberID(principalDetails.getMemberID())
            .build();
    }

    // /* refreshToken으로 accessToken 재발급 */

    // @PostMapping("/refresh-token")
    // public ResponseEntity<?> refresh(@AuthenticationPrincipal PrincipalDetails principalDetails){
        
    //     if (principalDetails == null) { throw new authResponseException(authExceptionType.WRONG_REFRESHTOKEN); }



    // }



    
    
}
