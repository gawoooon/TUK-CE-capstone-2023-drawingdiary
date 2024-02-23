package com.diary.drawing.diary.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter

@Table(name = "Date")
public class Date {
    @Id
    public Long dateID;

    private String year;

    private String month;
    
    private String day;


    // 명시적인 기본 생성자 추가
    public Date() {}

    @Builder
    public Date(String year, String month, String day){
        this.dateID =  Long.parseLong(year + month + day);
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

