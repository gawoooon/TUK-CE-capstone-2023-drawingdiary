package com.diary.drawing.sentiment.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.diary.drawing.sentiment.dto.SentimentDTO;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class SentimentService {

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
}
