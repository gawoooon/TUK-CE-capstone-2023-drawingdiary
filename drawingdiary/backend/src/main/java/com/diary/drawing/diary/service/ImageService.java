package com.diary.drawing.diary.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.diary.domain.Image;
import com.diary.drawing.diary.exception.DiaryExceptionType;
import com.diary.drawing.diary.exception.DiaryResponseException;
import com.diary.drawing.diary.repository.ImageRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageService {
    private final ImageRepository imageRepository;
    private final ValidateImageService validateImageService;

    /* 이미지 저장할 링크 application properties에서 */
    @Value("${image.upload.directory}")
    private String uploadDirectory;

    /* base 64에서 받아서 png위치로 return */
    @Transactional
    public String saveImageFromUrl(String imageUrl, LocalDate date) throws IOException, java.io.IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String dateForName = date.format(formatter);
        String fileName = dateForName + "-" + UUID.randomUUID().toString() + ".png";
        String filePath = uploadDirectory + "/" + fileName;

         // base64 문자열 디코딩하여 이미지 바이트 배열로 변환
        byte[] decodedBytes = Base64.getDecoder().decode(imageUrl);
        
        // 이미지 파일로 저장
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
        fos.write(decodedBytes);
        }

        return filePath;
    }

    /* 링크로 png 받아서 base64로 return */
    public String encodeImageToBase64String(String imagePath) throws Exception {
        byte[] fileContent = Files.readAllBytes(Path.of(imagePath));
        return Base64.getEncoder().encodeToString(fileContent);
    }
    
    /* 이미지 조회하기 */
    public String get64Image(String imagePath) {
        try {
            String base64Image = encodeImageToBase64String(imagePath);
            return base64Image;
        } catch (Exception e) {
            throw new DiaryResponseException(DiaryExceptionType.FAIL_TO_INCODE_IMAGE);
        }
    }


    /* 이미지 생성한것 저장 */
    //TODO: 완전히 구현 완료한 이후에 ImageRequestDTO로 넣기, 예외처리
    @Transactional
    public Image createImage(String imageUrl, Album album, LocalDate date) throws IOException, FileNotFoundException, java.io.IOException{
        String imageFile = saveImageFromUrl(imageUrl, date);
        try {
            Image image = Image.builder()
                .imageFile(imageFile)
                .album(album)
                .date(date)
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
    public Image updateImage(String imageUrl, Album album, Image image) throws IOException, FileNotFoundException, java.io.IOException{

        // /* 다이어리에 연결된 이미지 찾기, 없으면 404 에러 */
        // Image image = validateImageService.validateImage(imageID);

        /* 새로운 이미지 파일 받아오기 */
        String imageFile =  saveImageFromUrl(imageUrl, image.getDate());

        /* 이미지 수정하기 */
        image.update(imageFile, album);
        return imageRepository.save(image);

    }

    /* base64 받아서 저장한 경로로 저장하는거 테스트하기*/
    @Transactional
    public String testSaveImageFromUrl(String imageUrl, LocalDate date) throws IOException, FileNotFoundException, java.io.IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String dateForName = date.format(formatter);
        String fileName = dateForName + "-" + UUID.randomUUID().toString() + ".png";
        String filePath = uploadDirectory + "/" + fileName;

         // base64 문자열 디코딩하여 이미지 바이트 배열로 변환
        byte[] decodedBytes = Base64.getDecoder().decode(imageUrl);
        
        // 이미지 파일로 저장
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
        fos.write(decodedBytes);
        }

        return filePath;
    }
}
