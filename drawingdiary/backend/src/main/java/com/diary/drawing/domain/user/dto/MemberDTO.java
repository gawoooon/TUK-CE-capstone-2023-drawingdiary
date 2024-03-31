package com.diary.drawing.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class MemberDTO {

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class NameUpdate{
        private String newName;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class PasswordUpdate{
        private String oldPassword;
        private String newPassword;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class EmailUpdate{
        private String newEmail;
    }

    @Getter
    @ToString
    @AllArgsConstructor
    @Builder
    public static class PhoneNumberUpdate{
        private String phoneNumber;
    }
}
