package com.diary.drawing.user.service;


import org.springframework.security.authentication.AbstractAuthenticationToken;

import com.diary.drawing.user.domain.PrincipalDetails;

public class PrincipalDetailsAuthenticationToken extends AbstractAuthenticationToken{
    private final PrincipalDetails principalDetails;

    public PrincipalDetailsAuthenticationToken(PrincipalDetails principalDetails) {
        super(principalDetails.getAuthorities());
        this.principalDetails = principalDetails;
    }



    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }
    
}