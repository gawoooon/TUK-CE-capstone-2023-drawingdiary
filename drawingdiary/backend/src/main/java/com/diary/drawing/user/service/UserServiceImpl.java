// package com.diary.drawing.user.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.diary.drawing.user.domain.User;
// import com.diary.drawing.user.repository.UserRepository;

// import lombok.RequiredArgsConstructor;



// @RequiredArgsConstructor
// @Service
// public class UserServiceImpl implements UserDetailsService{

//     // DB와 연결(의존성 주입)

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private BCryptPasswordEncoder bCryptPasswordEncoder;

//     // 회원 가입 (예외처리 나중에)
//     public User joinUser(User user) {

//         // 암호화 나중에 클래스로 따로 분리하기
//         String rawPassword = user.getPassword();
//         String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//         user.setPassword(encPassword);
//         return userRepository.save(user);
//     }

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
//     }


//     // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//     //     // 여기서 받은 유저 패스워드와 비교하여 로그인 인증한다
        
//     // }

    


    
// }
