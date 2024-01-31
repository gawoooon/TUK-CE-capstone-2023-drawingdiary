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
import lombok.Data;


@Entity
@Data     //보안 문제 있을 것 같음 나중에 수정
@Table(name = "User")
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

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 50)
    private String personality;

    @Enumerated(EnumType.STRING)
    @Column(name="role")
    private MemberRole role; //ROLE_USER, ROLE_ADMIN

    private String provider;
    private String providerID;

    public String getRole() {
        return this.role.name();
    }
    

    @Override
    public String toString(){
        return "UserID: " + this.memberID + "Name: " +  this.name + "Email: " + this.email + "Password: " + this.password
                + "Birth: " + this.birth + "Gender: " + this.gender + "PhoneNumber: " + this.phoneNumber
                + "Personality: " + this.personality;
    }

    public Member (){}

    @Builder // 나중에 보안성 높이고 일단 구현(access = AccessLevel=private)
    public Member(String name, String email, Date birth, char gender, String password, String phoneNumber, String personality, String provider, String providerID){
        this.name = name;
        this.email = email;
        this.birth = birth;
        this.gender = gender;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.personality = personality;
        this.role = MemberRole.ROLE_USER;   //기본값 설정
        this.provider = provider;
        this.providerID = providerID;
    }








    
}