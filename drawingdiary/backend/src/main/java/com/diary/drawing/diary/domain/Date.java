package com.diary.drawing.diary.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "Date")
public class Date {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dateID;

    private String year;

    private String month;
    
    private String day;

    @Builder
    public Date(String year, String month, String day){
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

