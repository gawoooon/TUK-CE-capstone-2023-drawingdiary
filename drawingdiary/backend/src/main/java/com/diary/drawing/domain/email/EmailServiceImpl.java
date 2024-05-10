package com.diary.drawing.domain.email;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService{

    private final EmailVerificationService emailVerificationService;

    @Autowired
    JavaMailSender javaMailSender;

    @Value("${spring.mail.host}")
    private String host;

    // 인증코드 생성

    @Override
    public String sendSimpleMessage(String to)throws Exception{
        // TODO 원래는 로그 찍어야 하는데 급해서 일단 sout으로 구현
        String emailPassword = createKey();     // 인증번호 만들기

        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+ emailPassword);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
        
        helper.setSubject("[감성일기] 회원가입 인증 번호 안내");
        helper.setFrom(host);
        helper.setTo(to);

        // 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
        String msg="";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 주소 확인</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 회원가입 화면에서 입력해주세요.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += emailPassword;
        msg += "</td></tr></tbody></table></div>";
        helper.setText(msg, true);

        try{
            javaMailSender.send(message); // 전송
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        
        return emailPassword;
    }

    // 인증번호 만드는 메소드
    public static String createKey(){
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        for (int i=0; i<6; i++){    // 6자리
            key.append(random.nextInt(10)); //0~9까지 랜덤 생성
        }
        return key.toString();
    }

    @Override
    public void sendTempPassword(String to, String tempPassword)throws Exception{
        // TODO 원래는 로그 찍어야 하는데 급해서 일단 sout으로 구현
        String emailPassword = createKey();     // 인증번호 만들기

        System.out.println("보내는 대상 : "+ to);
        System.out.println("임시 비밀번호 : "+ tempPassword);
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
        
        helper.setSubject("[감성일기] 임시 비밀번호 안내");
        helper.setFrom(host);
        helper.setTo(to);

        // 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
        String msg="";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 주소 확인</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">임시 비밀번호를 확인하시고 마이페이지에서 재설정해주세요.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += tempPassword;
        msg += "</td></tr></tbody></table></div>";
        helper.setText(msg, true);

        try{
            javaMailSender.send(message); // 전송
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public Boolean verifyEmail(String email, String verifiCode){
        return emailVerificationService.verifyEmail(email, verifiCode);
    }

    public boolean saveVerificationCode(String email, String originVerificationCode){
        return emailVerificationService.verifyEmail(email, originVerificationCode);
    }

}

