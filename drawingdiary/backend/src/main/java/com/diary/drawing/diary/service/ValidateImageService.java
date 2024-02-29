package com.diary.drawing.diary.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.diary.domain.Image;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class ValidateImageService {

    private final ImageRepository imageRepository;

    public Image validateImage(Long imageID){
        Image image = imageRepository.findByImageID(imageID);
        if(image == null){ throw new DiaryResponseException(DiaryExceptionType.NOT_FOUND_IMAGE);}
        return image;
    }
    
}
