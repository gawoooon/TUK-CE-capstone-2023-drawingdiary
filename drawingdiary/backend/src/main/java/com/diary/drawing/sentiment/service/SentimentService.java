package com.diary.drawing.sentiment.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.diary.drawing.sentiment.domain.Sentiment;
import com.diary.drawing.sentiment.dto.SentimentDTO;
import com.diary.drawing.sentiment.repository.SentimentRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class SentimentService {
    private final SentimentRepository sentimentRepository;

    public Sentiment validatSentiment(Long sentimentID) {
        return sentimentRepository.findBySentimentID(sentimentID)
                .orElseThrow(() -> new RuntimeException("일치하는 sentiment가 없습니다."));

    }

    /* 분석 생성 */
    public SentimentDTO analyzeSentiment(String text) {
        final String apiUrl = "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-NCP-APIGW-API-KEY-ID", "ksnv4tfdvd");
        headers.set("X-NCP-APIGW-API-KEY", "fcVwyGMNR7eJjAPDbMDZxdsOobEl1jHlvsS6RAC8");

        String requestJson = "{\"content\": \"" + text + "\"}";

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        return restTemplate.postForObject(apiUrl, entity, SentimentDTO.class);
    }

    // /* 분석 결과 저장 */
    // @Transactional
    // public Sentiment saveSentiment(String text, Diary diary) {
    //     SentimentDTO dto = analyzeSentiment(text);
    //     Sentiment sentiment = Sentiment.builder()
    //         .diary(diary)
    //         .sentiment()
    //         .build()

    //     return sentimentRepository.save() 
    // }
}
