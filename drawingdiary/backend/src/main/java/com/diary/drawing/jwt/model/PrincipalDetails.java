package com.diary.drawing.jwt.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Builder;
import lombok.Getter;


//일반 로그인과 oath2 로그인을 한번에 다루는 클래스
@Getter
@Builder
public class PrincipalDetails implements UserDetails{
    
    private final Long memberID;
    private final String email;

    @JsonIgnore
    private String password;

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
        return password;
    }

    @Override
    public String getUsername() { // User PK 또는 고유한 값을 리턴(여기선 이메일)
        return email;
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
    
}
