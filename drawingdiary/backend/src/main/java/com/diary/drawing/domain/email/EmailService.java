package com.diary.drawing.domain.email;

public interface EmailService {
    public String sendSimpleMessage(String to)throws Exception;
    public void sendTempPassword(String to, String tempPassword)throws Exception;
    public Boolean verifyEmail(String email, String verifiCode);
    public boolean saveVerificationCode(String email, String originVerificationCode);
}
