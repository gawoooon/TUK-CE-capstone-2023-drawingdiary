package com.diary.drawing.email;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class EmailVerificationDTO {
    public String email;
    public String verificationCode;
}
