package com.diary.drawing.global.jwt.security;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.diary.drawing.global.jwt.exception.AuthExceptionType;
import com.diary.drawing.global.jwt.exception.AuthResponseException;
import com.diary.drawing.global.jwt.service.PrincipalDetailsAuthenticationToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;



@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{


    private final JwtDecoder jwtDecoder;
    private final JwtToPrincipalConverter jwtToPrincipalConverter;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        try {
            Optional<String> token = extractTokenFromRequest(request);
            if (token.isPresent() && jwtDecoder.isTokenExpired(token.get())) {
                throw new AuthResponseException(AuthExceptionType.EXPIRED_TOKEN);
            }
        
            token.map(jwtDecoder::decode)
                .map(jwtToPrincipalConverter::convert)
                .map(PrincipalDetailsAuthenticationToken::new)
                .ifPresent(authentication -> SecurityContextHolder.getContext().setAuthentication(authentication));
        
            filterChain.doFilter(request, response);
        } catch (AuthResponseException e) {
            handleAuthException(e, response);
        }
    }

    /* 바로 exception을 리턴하는 함수를 임시로 생성함 */
    private void handleAuthException(AuthResponseException e, HttpServletResponse response) throws IOException {
        HttpStatus status = e.getExceptionType().getHttpStatus();
        String message = e.getExceptionType().getErrorMessage();
        
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write("{\"status\":" + status.value() +
            ", \"error\": \"" + status.getReasonPhrase() +
            "\", \"message\": \"" + message + "\"}");
    }



    // null이면 false 나옴... 본래 private이나 바꿨음
    // 보통 Authorization: Bearear <7글자기 때문에 7개 제외
    public Optional<String> extractTokenFromRequest(HttpServletRequest request){
        var token = request.getHeader("Authorization");
        if(StringUtils.hasText(token) && token.startsWith("Bearer ")){
            return Optional.of(token.substring(7));
        }

        return Optional.empty();
    }

    
}
