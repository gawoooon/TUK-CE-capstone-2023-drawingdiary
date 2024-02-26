package com.diary.drawing.diary.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateDiaryResponseDTO {
    private Long diaryID;


    public CreateDiaryResponseDTO(Long diaryID){
        this.diaryID = diaryID;
    }
}
