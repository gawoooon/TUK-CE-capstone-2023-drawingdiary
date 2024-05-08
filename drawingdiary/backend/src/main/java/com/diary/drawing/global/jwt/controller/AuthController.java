package com.diary.drawing.global.jwt.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.global.jwt.domain.PrincipalDetails;
import com.diary.drawing.global.jwt.dto.JwtRequestDTO;
import com.diary.drawing.global.jwt.dto.JwtResponseDTO;
import com.diary.drawing.global.jwt.exception.authExceptionType;
import com.diary.drawing.global.jwt.exception.authResponseException;
import com.diary.drawing.global.jwt.security.JwtAuthenticationFilter;
import com.diary.drawing.global.jwt.security.JwtDecoder;
import com.diary.drawing.global.jwt.security.JwtIssuer;
import com.diary.drawing.global.jwt.service.AuthService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


@Tag(name = "Auth", description = "Auth API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtIssuer jwtIssuer;  // 최종적인 값이므로 final 자동 생성자 RequiredArgsConstructor
    private final JwtDecoder jwtDecoder;
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    /* 로그인 */
    @PostMapping("/login")
    public JwtResponseDTO login(@RequestBody JwtRequestDTO.loginRequestDTO request){
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
        String refreshToken = jwtIssuer.createRefreshToken(principalDetails.getMemberID(), principalDetails.getEmail(), roles);

        // 5. 발급받은 refreshToken은 redis에 저장
        authService.saveToken(principalDetails.getMemberID(), refreshToken);

        return JwtResponseDTO.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .memberID(principalDetails.getMemberID())
            .build();
    }

    /* refreshToken으로 accessToken 재발급 */
    // 원래 만료된 accesstoken으로 사용자 확인 해야해서 같이 보내줘야함
    @GetMapping("/refresh")
    public ResponseEntity<JwtResponseDTO> refresh(HttpServletRequest request, @AuthenticationPrincipal PrincipalDetails principalDetails){
  
        var refreshToken = request.getHeader("Authorization").substring(7);
        
        if (principalDetails != null){
                String accessToken = authService.reissueAccessToken(refreshToken, principalDetails.getMemberID());
                // 응답 생성
                JwtResponseDTO response = JwtResponseDTO.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .memberID(principalDetails.getMemberID())
                    .build();
                return ResponseEntity.ok(response);
        }
        
        // 유효하지 않은 refreshToken에 대한 처리
        throw new authResponseException(authExceptionType.WRONG_REFRESHTOKEN);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, @AuthenticationPrincipal PrincipalDetails principalDetails){
        var accessToken = request.getHeader("Authorization").substring(7);
        JwtRequestDTO.logoutRequestDTO requestDTO = new JwtRequestDTO.logoutRequestDTO(accessToken, principalDetails.getMemberID());
        authService.logout(requestDTO);
        return ResponseEntity.ok("logout");
    }

    
    
}
