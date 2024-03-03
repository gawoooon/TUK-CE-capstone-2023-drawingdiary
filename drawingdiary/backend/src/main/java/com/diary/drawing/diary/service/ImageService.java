package com.diary.drawing.diary.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.diary.drawing.album.domain.Album;
import com.diary.drawing.diary.domain.Image;
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

    /* 이미지 url에서 파일 받아서 저장한 경로 return */
    public String saveImageFromUrl(String imageUrl, LocalDate date) throws IOException, java.io.IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String dateForName = date.format(formatter);
        String extension = imageUrl.substring(imageUrl.lastIndexOf(".") + 1);
        String fileName = dateForName + "-" + UUID.randomUUID().toString() + "." + extension;
        String filePath = uploadDirectory + File.separator + fileName;

        URL url = new URL(imageUrl);
        Path destination = Paths.get(filePath);

        try (InputStream inStream = url.openStream()) {
            Files.copy(inStream, destination);
        }

        return filePath;
    }


    /* 이미지 생성한것 저장 */
    //TODO: 완전히 구현 완료한 이후에 ImageRequestDTO로 넣기, 예외처리
    @Transactional
    public Image createImage(String imageUrl, Album album, LocalDate date) throws IOException, FileNotFoundException, java.io.IOException{
        try {
            Image image = Image.builder()
                .imageFile(imageUrl)
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
    public Image updateImage(String imageUrl, Album album, Long imageID) throws IOException, FileNotFoundException, java.io.IOException{

        /* 다이어리에 연결된 이미지 찾기, 없으면 404 에러 */
        Image image = validateImageService.validateImage(imageID);

        /* 새로운 이미지 파일 받아오기 */
        String imageFile =  saveImageFromUrl(imageUrl, image.getDate());

        /* 이미지 수정하기 */
        image.update(imageFile, album);
        return imageRepository.save(image);

    }

    /* 이미지 url에서 파일 받아서 저장한 경로로 저장하는거 테스트하기*/
    public String testSaveImageFromUrl(String imageUrl, LocalDate date) throws IOException, FileNotFoundException, java.io.IOException {
        // 파일(date + 무작위번호) 다운로드하고 저장
         // 이미지 파일 다운로드 및 저장
        String fileName = UUID.randomUUID().toString();
        File file = new File(uploadDirectory + "/" + fileName);
        
        RestTemplate restTemplate = new RestTemplate();
        byte[] imageBytes = restTemplate.getForObject(imageUrl, byte[].class);
        
        if (imageBytes != null) {
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(imageBytes);
            }
        }

        return file.getPath();
    }
}
