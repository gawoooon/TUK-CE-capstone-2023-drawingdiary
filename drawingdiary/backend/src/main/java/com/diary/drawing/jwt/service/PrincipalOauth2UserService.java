package com.diary.drawing.jwt.service;
// package com.diary.drawing.user.service;

// import java.util.UUID;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
// import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
// import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
// import org.springframework.security.oauth2.core.user.OAuth2User;
// import org.springframework.stereotype.Service;

// import com.diary.drawing.user.domain.Member;
// import com.diary.drawing.user.domain.MemberRole;
// import com.diary.drawing.user.repository.MemberRepository;

// @Service
// public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

//     @Autowired
//     MemberRepository userRepository;

//     private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


//     //userRequest에는 AccessToken + 사용자 프로필 정보를 받는다.
//     @Override
//     public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//         OAuth2User oAuth2User = super.loadUser(userRequest);
//         String provider = userRequest.getClientRegistration().getRegistrationId(); // google
//         String providerId = oAuth2User.getAttribute("sub");
//         String username = provider + "_" + providerId;
//         // 랜덤으로 6자리 수 생성해서 비밀번호 암호화
//         String uuid = UUID.randomUUID().toString().substring(0, 6);
//         String password = bCryptPasswordEncoder.encode("비밀번호암호화" + uuid);
//         String email = oAuth2User.getAttribute("email");
//         MemberRole role = MemberRole.ROLE_USER;

//         Member userEntity = userRepository.findByEmail(email);

//         // 이거 안정해서 일단 이렇게 해놨는데
//         // 만약에 회원가입 안되어 있으면 구글 회원가입과 동시에 일단 user로 저장하고
//         // 회원가입 절차 날리고 저장되게 해둠
//         // 나중에 회의해서 새로운 페이지 만들어서 세부사항이나 생일 받아야할듯

//         if (userEntity == null) {
//             userEntity = Member.builder()
//                     .Name(username)
//                     .Password(password)
//                     .Email(email)
//                     .role(role)
//                     .provider(provider)
//                     .providerID(providerId)
//                     .build();
//             userRepository.save(userEntity);
//         }

//         //todo :: return token으로 후에 교체
//         //return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
//     }
// }