package com.diary.drawing.diary.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "Date")
public class Date {
    @Id
    public Long dateID;

    private String year;

    private String month;
    
    private String day;

    @Builder
    public Date(String year, String month, String day){
        this.dateID =  Long.parseLong(year + month + day);
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

