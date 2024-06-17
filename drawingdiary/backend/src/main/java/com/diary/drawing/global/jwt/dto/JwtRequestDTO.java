package com.diary.drawing.global.jwt.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;



public class JwtRequestDTO {

    @Getter
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class loginRequestDTO{
        private String email;
        private String password;
    }


    @Builder
    @Jacksonized
    @Getter
    @ToString
    @AllArgsConstructor
    @NoArgsConstructor
    public static class logoutRequestDTO{
        private String token;
        private Long memberID;
    }
}


