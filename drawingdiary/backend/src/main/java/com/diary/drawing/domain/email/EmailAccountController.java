package com.diary.drawing.domain.email;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class EmailAccountController {

    private final EmailService emailService;
    private final EmailVerificationService verificationService;


    // 인증번호 전송, 잘 보내지면 알아서 상태코드 200
    // TODO: 이부분 responseEntity custom으로 바꾸던가 삭제하던가
    @PostMapping("/api/email/codesending")
    public ResponseEntity<String> mailConfirm(@RequestBody EmailRequestDTO emailRequestDTO) throws Exception{
        try{
            String code = emailService.sendSimpleMessage(emailRequestDTO.getEmail());
            verificationService.saveVerificationCode(emailRequestDTO.getEmail(), code);
            return new ResponseEntity<String>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);

        }
        
    }

    // 인증번호 확인, 되면 true 아니면 false boolean
    // TODO: 에러코드 표현 따로 만들고 노션에 업로드, request VerificationRequest request로 수정
    @PostMapping("/api/email/verify")
    public ResponseEntity<Boolean> verify(@RequestBody EmailVerificationDTO requesDto){
        if(verificationService.verifyEmail(requesDto.getEmail(), requesDto.getVerificationCode())){
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);

        } else{
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        }
    }
    



    // 테스트용 - 코드를 반환해줌
    @PostMapping("/api/email/test")
    public String mailConfirmTest(@RequestBody String email) throws Exception{
        String code = emailService.sendSimpleMessage(email);
        return code;
    }


    
}
