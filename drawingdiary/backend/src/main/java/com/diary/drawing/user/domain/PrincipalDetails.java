package com.diary.drawing.user.domain;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Builder;
import lombok.Getter;


//일반 로그인과 oath2 로그인을 한번에 다루는 클래스
@Getter
public class PrincipalDetails implements UserDetails, OAuth2User{
    
    private User user;  // 컴포지션
    private Map<String, Object> attributes;

    // 일반 사용자 생성자
    @Builder
    public PrincipalDetails(User user) {
        this.user = user;
    }

    // 소셜 로그인 사용자 생성자
    // attribute를 이용해서 User 만들거임
    @Builder
    public PrincipalDetails(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    // 로그인 해보기 위해서 만들었음
    public Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return authorities;
    }
    

    //User의 권한을 리턴하는 곳, 일단 뺴둠
    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     Collection<GrantedAuthority> collect = new ArrayList<>();
    //     collect.add(new GrantedAuthority() {
    //         @Override
    //         public String getAuthority() {
    //             return user.getRole();
    //         }
    //     });
    //     return collect;
    // }

    @Override
    public String getPassword() {   // User 비밀번호 리턴
        return user.getPassword();
    }

    @Override
    public String getUsername() { // User PK 또는 고유한 값을 리턴(여기선 이메일)
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; //true: 만료 안됨
    }

    @Override
    public boolean isAccountNonLocked() {
       return true; //true: 안잠김
    }

    @Override
    public boolean isCredentialsNonExpired() {  // 비밀번호 만료 여부 확인
        return true; //true 비밀번호 만료 안됨
    }

    @Override
    public boolean isEnabled() {    // 활성화 여부 리턴
        return true; // true : 활성화 됨
    }



    // 여기부터 OAuth2User 메서드 //
    @Override
    public Map<String, Object> getAttributes() {    // 소셜 로그인 시도하면 string으로 옴, 사용자 정보 담는 클래스
        return attributes;
    }

    @Override
    public String getName() {
        return null;
    }


    
    
}
