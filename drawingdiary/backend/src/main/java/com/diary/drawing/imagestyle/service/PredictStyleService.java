package com.diary.drawing.imagestyle.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.diary.drawing.imagestyle.domain.ModelPrediction;
import com.diary.drawing.imagestyle.dto.PredictRequestDTO;
import com.diary.drawing.imagestyle.dto.PredictResponseDTO;
import com.diary.drawing.imagestyle.repository.ModelPredictionRepository;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.service.ValidateMemberService;

import lombok.RequiredArgsConstructor;


@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PredictStyleService{
    private final ValidateMemberService validateMemberService;
    private final ModelPredictionRepository modelPredictionRepository;

    /* 조회한 예측 결과 저장 */
    @Transactional
    public ResponseEntity<?> saveStyles(PredictRequestDTO predictRequestDTO, Long memberID){
        ModelPrediction modelPrediction = validatePrediction(memberID);
        PredictResponseDTO response = getStyles(predictRequestDTO);

        // 답변 null이면 오류 반환
        try{
            List<String> getResponse = response.getPredicted_styles();
            modelPrediction.update(getResponse);
            modelPredictionRepository.save(modelPrediction);
            return ResponseEntity.ok(response);
        }
        catch(NullPointerException e){
            return ResponseEntity.ofNullable("예측 생성에 실패했습니다.");
        }
    
    }

    /* ModelPrediction을 찾고 있으면 반환하고 아니면 새로 생성함 */
    @Transactional
    public ModelPrediction validatePrediction(Long memberID){
        ModelPrediction prediction = modelPredictionRepository.findByMember_MemberID(memberID);

        // 없으면 생성 및 초기화
        if(prediction == null){
            Member member = validateMemberService.validateMember(memberID);
            return modelPredictionRepository.save(new ModelPrediction(member, "모더니즘", "미니멀리즘", "복고풍", "펑크", "고전주의"));
        }

        return prediction;
    }

    /* python 예측 모델에서 prediction_styles라는 string 리스트 반환 */
    public PredictResponseDTO getStyles(PredictRequestDTO predictRequestDTO) {
    String url = "http://localhost:5001/api/get-styles";

    // 요청 본문 생성하기
    Map<String, Object> body = new HashMap<>();
    body.put("age", predictRequestDTO.getAge());
    body.put("gender", predictRequestDTO.getGender());

    // 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    // HttpEntity 객체 생성하기
    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

    // RestTemplate 객체 생성/요청 전송
    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<PredictResponseDTO> response = null;

    try {
        response = restTemplate.exchange(url, HttpMethod.POST, entity, PredictResponseDTO.class);
    } catch (RestClientException e) {
        // 예외 처리 로직
        System.out.println("API 호출 중 오류 발생: " + e.getMessage());
        return null;
    }

    return response.getBody();
}


    /* 그냥 현재 추천 스타일 조회만 */
    public ResponseEntity<PredictResponseDTO> getExistPrediction(Long memberID){
        Member member = validateMemberService.validateMember(memberID);
        ModelPrediction prediction = validatePrediction(memberID);
        List<String> existPrediction = Arrays.asList(prediction.getStyle1(), prediction.getStyle2(), prediction.getStyle3(), prediction.getStyle4(), prediction.getStyle5());
        return ResponseEntity.ok(new PredictResponseDTO(existPrediction));
    }
}
