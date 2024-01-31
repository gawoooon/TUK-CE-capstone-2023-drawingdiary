package com.diary.drawing.jwt.service;


import org.springframework.security.authentication.AbstractAuthenticationToken;

import com.diary.drawing.jwt.model.PrincipalDetails;

public class PrincipalDetailsAuthenticationToken extends AbstractAuthenticationToken{

    private final PrincipalDetails principalDetails;

    public PrincipalDetailsAuthenticationToken(PrincipalDetails principalDetails) {
        super(principalDetails.getAuthorities());
        this.principalDetails = principalDetails;
        setAuthenticated(true);
    }



    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public PrincipalDetails getPrincipal() {
        return principalDetails;
    }
    
}