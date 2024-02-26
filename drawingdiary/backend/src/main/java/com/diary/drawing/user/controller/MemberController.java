package com.diary.drawing.user.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.album.dto.AlbumRequestDTO;
import com.diary.drawing.album.service.AlbumService;
import com.diary.drawing.jwt.domain.PrincipalDetails;
import com.diary.drawing.user.domain.Member;
import com.diary.drawing.user.dto.GetMemberDTO;
import com.diary.drawing.user.dto.MemberJoinDTO;
import com.diary.drawing.user.dto.PersonalityUpdateDTO;
import com.diary.drawing.user.exception.MemberExceptionType;
import com.diary.drawing.user.exception.MemberResponseException;
import com.diary.drawing.user.repository.MemberRepository;
import com.diary.drawing.user.service.MemberService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Member", description = "Member API")
@RestController
@RequestMapping("/api")

public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private AlbumService albumService;
    @Autowired
    private MemberRepository memberRepository;


    // 로그인은 jwt AuthController 에 구현되어있음


    // 테스트용, 지우지 말것. 로그인 되어있는 경우 해당 사용자 정보 반환하는 api
    // @AuthenticationPrincipal principal 정보 가져옴
    // TODO: 정보 가져오게
    @GetMapping("/secured")
    public String secured(@AuthenticationPrincipal PrincipalDetails principalDetails){
        if (principalDetails != null) {
            return "IF you see this. then youre logged in " + principalDetails.getEmail()
                        + "User ID: " + principalDetails.getMemberID();
            
        } else {
            // handle the case where principalDetails is null
            return "User is not logged in.";
        }
    }

    
    // AccessToken으로 정보를 가져오는 메소드, ResponseEntity<Member>로 수정
    @GetMapping("/get-member")
    public ResponseEntity<?> getMember(@AuthenticationPrincipal PrincipalDetails principalDetails){

        GetMemberDTO getMemberDTO = memberService.getMember(principalDetails.getMemberID());
        if(getMemberDTO != null){
            return ResponseEntity.ok(getMemberDTO);
        }

        throw new MemberResponseException(MemberExceptionType.ERROR_GET_MEMBER);
    }
    

    /*  회원가입 api
     *  @param : MemberJoinDTO
     */
    @Operation(summary = "회원가입", description = "회원가입")
    @PostMapping("/join")
    public void add(@Valid @RequestBody MemberJoinDTO memberDTO) throws Exception{
        if (memberRepository.existsByEmail(memberDTO.getEmail())){
            throw new MemberResponseException(MemberExceptionType.ALREADY_EXIST_EMAIL);
        }
        
        // 만약 이메일 인증번호가 옳지 않다면 못넘어감
        Long memberID = memberService.joinMember(memberDTO).getMemberID();

        // 회원가입과 동시에 [기본] 앨범 생성함
        albumService.addAlbum(new AlbumRequestDTO("기본"), memberID);
        
    }

    

    // 성격 속성에 값을 추가하는 부분 따로 구현해놔서 이렇게 해야 한다고 함
    @PostMapping("/updatePersonality")
    public ResponseEntity<?> updatePersonality(@RequestBody PersonalityUpdateDTO updateDTO) {
        Optional<Member> memberOptional = memberService.findByEmail(updateDTO.getEmail());
        if(!memberOptional.isPresent()) {
            return ResponseEntity.badRequest().body("해당 이메일의 사용자를 찾을 수 없습니다.");
        }

        Member member = memberOptional.get();
        memberService.joinMemberPersonality(member, updateDTO.getPersonality());

        return ResponseEntity.ok().body("성격 유형이 업데이트 되었습니다.");
    }

}
