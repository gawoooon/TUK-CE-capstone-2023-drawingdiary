// package com.diary.drawing.user.service;
// import java.lang.annotation.Annotation;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.ModelAttribute;

// import com.diary.drawing.user.domain.Member;
// import com.diary.drawing.user.repository.MemberRepository;

// // 일반 로그인에 관한 서비스

// @Service
// public class MemberService implements Service {

//     @Autowired
//     private MemberRepository userRepository;

//     @Autowired
//     private BCryptPasswordEncoder bCryptPasswordEncoder;

//     public String joinUser(@ModelAttribute Member user) {

//         // 암호화 나중에 클래스로 따로 분리하기
//         String rawPassword = user.getPassword();
//         String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//         user.setPassword(encPassword);
//         userRepository.save(user);
//         return "OK";
//     }

//     @Override
//     public Class<? extends Annotation> annotationType() {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'annotationType'");
//     }

//     @Override
//     public String value() {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'value'");
//     }


//     //email로 로그인한 유저가 DB에 있는지 찾는 메서드
//     // @Override
//     // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//     //     Member userEntity = userRepository.findByEmail(username);
//     //     if(userEntity != null) {
//     //         return new Member(userEntity);
//     //     }
//     //     return null;
//     // }
// }