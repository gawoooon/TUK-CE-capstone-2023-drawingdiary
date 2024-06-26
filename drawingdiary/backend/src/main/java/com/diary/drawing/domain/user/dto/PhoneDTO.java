package com.diary.drawing.domain.user.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;


public class PhoneDTO {

    @Jacksonized
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class codeSendingDTO {
        private String phoneNumber;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class verifyDTO {
        private String phoneNumber;
        private String code;
    }

    @Jacksonized
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class responseNewDTO {
        private Boolean isVerified;
    }

    @Jacksonized
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class responseExistedDTO {
        private Boolean isVerified;
        private String email;
    }

}

