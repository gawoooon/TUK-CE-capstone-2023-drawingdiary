package com.diary.drawing.user.dto;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;



@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class MemberDTO {

    @NotEmpty(message = "닉네임을 비울 수 없습니다.")
    private String name;

    @NotEmpty(message = "이메일을 비울 수 없습니다.")
    @Email
    private String email;

    @NotEmpty(message = "패스워드를 비울 수 없습니다.")
    private String password;

    @NotEmpty(message = "생일을 비울 수 없습니다.")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)")
    private Date birth;

    @NotEmpty(message = "성별을 비울 수 없습니다.")
    private char gender;
}
