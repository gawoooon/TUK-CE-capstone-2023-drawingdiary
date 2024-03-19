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

    private static final String S3_BUCKET_DIRECTORY_NAME = "static";

    @Autowired
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadImage(String base64Image, LocalDate date) throws java.io.IOException {
        
        // 파일명 만들기
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

}
