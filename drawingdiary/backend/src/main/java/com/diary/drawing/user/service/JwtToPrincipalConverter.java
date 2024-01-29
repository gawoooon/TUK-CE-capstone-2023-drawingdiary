package com.diary.drawing.user.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.diary.drawing.user.domain.PrincipalDetails;


@Component
public class JwtToPrincipalConverter {

    public PrincipalDetails convert(DecodedJWT jwt){
        return PrincipalDetails.builder()
            .memberId(Long.valueOf(jwt.getSubject()))
            .email(jwt.getClaim("e").asString())
            .authorities(extractAuthoritiesFromClaim(jwt))
            .build();

    }

    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt){
        var claim = jwt.getClaim("a");
        if (claim.isNull() || claim.isMissing()) return List.of();
        return claim.asList(SimpleGrantedAuthority.class);
    }
}
