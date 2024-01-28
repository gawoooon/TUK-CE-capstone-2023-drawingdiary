package com.diary.drawing.user.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.diary.drawing.user.domain.PrincipalDetails;

public class JwtToPrincipalConverter {

    public PrincipalDetails convert(DecodedJWT jwt){
        Long userId = Long.valueOf(jwt.getSubject());
        User user = userService.findUserById(userId); // userService는 User 객체를 검색하는 서비스입니다.
        return PrincipalDetails.builder()
            .user(user)
            .email(jwt.getClaim("e").asString())
            .authorities()
            .build();
}

    }

    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
        var claim = jwt.getClaim("a");
        if (claim.isNull() || claim.isMissing()) return List.of();
        return claim.asList(SimpleGrantedAuthority.class);
    }
}
