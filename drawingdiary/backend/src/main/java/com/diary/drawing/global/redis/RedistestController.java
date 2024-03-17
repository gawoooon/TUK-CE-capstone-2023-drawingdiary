package com.diary.drawing.global.redis;

import java.util.Map;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RedistestController {

    private final RedisTemplate<String, String> redisTemplate;

    // post는 "key" : "키", "value" : "값"의 json body 형태로
    // 이거 호출하면 redis에 저장
    @PostMapping("/data")
    public ResponseEntity<String> setRedisData(
        @RequestBody(required = true) Map<String,String> map) throws Exception{

            redisTemplate.opsForValue().set(map.get("key"), map.get("value"));

        return new ResponseEntity<>("정상 등록", HttpStatus.CREATED);
    }

    // get string 값으로 받아옴
    @GetMapping("/data")
    public ResponseEntity<String> getRedisData(
        @RequestParam(required = true) String key){

        return new ResponseEntity<>(redisTemplate.opsForValue().get(key), HttpStatus.OK);

    }
}
