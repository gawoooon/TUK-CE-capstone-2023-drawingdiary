package com.diary.drawing.user.domain;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;


@Entity
@Getter
@Table(name = "Member")
public class Member {
        
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberID;

    @Column(length = 50)
    private String name;

    @Column(unique = true, length = 255)
    private String email;

    @Column(length = 255)
    private String password;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birth;

    private char gender;

    @Column(length = 50)
    private String personality;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private MemberRole role; //ROLE_USER, ROLE_ADMIN

    private String profileImage;

    public String getRole() {
        return this.role.name();
    }
    

    @Override
    public String toString(){
        return "UserID: " + this.memberID + "Name: " +  this.name + "Email: " + this.email + "Password: " + this.password
                + "Birth: " + this.birth + "Gender: " + this.gender + "ProfileImage: " + this.profileImage
                + "Personality: " + this.personality;
    }

    public Member (){}

    @Builder // 나중에 보안성 높이고 일단 구현(access = AccessLevel=private), personality, image는 별개
    public Member(String name, String email, Date birth, char gender, String password){
        this.name = name;
        this.email = email;
        this.birth = birth;
        this.gender = gender;
        this.password = password;
        this.role = MemberRole.ROLE_USER;   //기본값 설정
    }








    
}