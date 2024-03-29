package com.diary.drawing.domain.user.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
@EqualsAndHashCode
public class PhoneVerificationResponseDTO {
        private String email;


        public PhoneVerificationResponseDTO(String email) {
                this.email = email;
        }
}
