package com.diary.drawing.user.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class GetMemberDTO {

    private Long memberID;

    private String name;

    private String email;

    private Date birth;

    private char gender;

    private String personality;

    private String profileImage;

    private int theme;
}
