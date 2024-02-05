package com.diary.drawing.email;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class EmailAccountController {

    private final EmailService emailService;

    @PostMapping("/api/email")
    public String mailConfirm(@RequestBody String email) throws Exception{
        String code = emailService.sendSimpleMessage(email);
        return code;
    }
}
