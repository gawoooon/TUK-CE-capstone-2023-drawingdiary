package com.diary.drawing.global.s3;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {


    @Autowired
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadImage(String base64Image, LocalDate date, String directory) throws java.io.IOException {
        
        // 파일명 만들기
        String S3_BUCKET_DIRECTORY_NAME = getDirectoryName(directory);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String dateForName = date.format(formatter);
        String fileName = S3_BUCKET_DIRECTORY_NAME +  "/" + dateForName + "-" + UUID.randomUUID().toString() + ".png";
        
        // Base64로 인코딩된 이미지 URL 디코딩
        byte[] imageBytes = Base64.decodeBase64(base64Image);

        return putS3(imageBytes, fileName);
    }

    private String putS3(byte[] imageBytes, String fileName) throws IOException{

        // 메타데이터 설정
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/png");
        objectMetadata.setContentLength(imageBytes.length);

        // 디코딩된 바이트 배열을 InputStream으로 변환
        try(InputStream inputStream = new ByteArrayInputStream(imageBytes)){
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3Client.getUrl(bucket, fileName).toString();
        }
    }

    // 입력된 값에 따라 디렉토리 이름을 변경
    private String getDirectoryName(String directory) {
        if (directory != null && !directory.isEmpty()) {
            if (directory.equals("d")) {
                directory = "diary";
            } else if (directory.equals("p")) {
                directory = "profile";
            }
        } else {
            // TODO: optionnull로오류 터짐
            directory = "diary";
        }
        return directory;
    }

    public String deleteImage(String ImageUrl){

        String result = "SUCCESS";
        try{
            // 파일 이름 추출
            String fileName = extractfileNameFromUrl(ImageUrl);

            // 이미지 존재하는지 확인
            boolean isObjectExist = amazonS3Client.doesObjectExist(bucket, fileName);

            if(isObjectExist){
                // 이미지 삭제
                amazonS3Client.deleteObject(bucket, fileName);
            }
            else {
                result = "IMAGE_NOT_FOUND";
                // TODO: 오류 터트리기
            }
        } catch (Exception e){
            log.debug("Delete File failed", e);
        }

        return result;
    }

    private String extractfileNameFromUrl(String imageUrl) {
        //https://drawingdiarytestbucket.s3.ap-northeast-2.amazonaws.com/static/20240317-9ca032cf-162d-4f3c-9f3a-8d82877d80b5.png
        String[] parts = imageUrl.split("/");
        String fileName = parts[parts.length-2] + "/" + parts[parts.length-1];
        return fileName;
    }

}
