<<<<<<<< HEAD:drawingdiary/backend/src/main/java/com/template/drawing/user/domain/User.java
package com.template.drawing.user.domain;
========
package com.diary.drawing.user;
>>>>>>>> ebf0b6e16ec2d3a5096dd7e86026c8ecca279203:drawingdiary/backend/src/main/java/com/template/drawing/user/User.java

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "User")
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long UserID;

    private String Name;
    private String Email;
    private Date Birth;
    private char Gender;
    private String PhoneNumber;
    private String Personality;


    public Long getUserID() {
        return this.UserID;
    }

    public void setUserID(Long UserID) {
        this.UserID = UserID;
    }

    public String getName() {
        return this.Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getEmail() {
        return this.Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public Date getBirth() {
        return this.Birth;
    }

    public void setBirth(Date Birth) {
        this.Birth = Birth;
    }

    public char getGender() {
        return this.Gender;
    }

    public void setGender(char Gender) {
        this.Gender = Gender;
    }

    public String getPhoneNumber() {
        return this.PhoneNumber;
    }

    public void setPhoneNumber(String PhoneNumber) {
        this.PhoneNumber = PhoneNumber;
    }

    public String getPersonality() {
        return this.Personality;
    }

    public void setPersonality(String Personality) {
        this.Personality = Personality;
    }


    
}