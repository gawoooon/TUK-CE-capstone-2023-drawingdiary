package com.diary.drawing.diary.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.diary.domain.Diary;
import com.diary.drawing.diary.domain.Image;
import com.diary.drawing.diary.domain.Prompt;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageService {
    private final ImageRepository imageRepository;

    /* 나중에 삭제하기! 파이썬으로 이미지 받는 메서드 생각해봤어 참고용으로 써줘!
     * ImageRequestDTO 는 String imageFile, Diary diary, Prompt prompt
     *
     * public ImageRequestDTO generateImage(Diary diary, Prompt prompt){
     *      ImageFile = prompt 기반으로 파이썬으로 generate하고 URL 받는 메소드(prompt)
     *      ImageRequestDTO 에 String imageFile, Diary diary, Prompt prompt 넣어서 생성 후 return
     * }
     */



    /* 이미지 생성한것 저장 */
    //TODO: 완전히 구현 완료한 이후에 ImageRequestDTO로 넣기, 예외처리
    @Transactional
    public Image createImage(String imageFile, Diary diary, Prompt prompt){
        try {
            Image image = Image.builder()
                .imageFile(imageFile)
                .diary(diary)
                .date(diary.getDate())
                .prompt(prompt)
                .build();
            return imageRepository.save(image);
        } catch (Exception e) {
            // 예외 처리 코드
            System.out.println("이미지 생성 중 오류가 발생했습니다: " + e.getMessage());
            return null;
        }
    }

    /* 이미지 수정하는 메서드 */
    @Transactional // 오류나면 롤백
    public Image updateImage(String imageFile, Diary diary, Prompt prompt){


        /* 다이어리에 연결된 이미지 찾기, 없으면 404 에러 */
        Image image = imageRepository.findByDiary(diary);
        if(image == null){
            throw new DiaryResponseException(DiaryExceptionType.NOT_FOUND_IMAGE);
        }

        /* 이미지 수정하기 */
        image.update(imageFile, diary, diary.getDate(), prompt);
        return imageRepository.save(image);

    }

}
