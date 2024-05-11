package com.diary.drawing.domain.user.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diary.drawing.domain.album.dto.AlbumRequestDTO;
import com.diary.drawing.domain.album.service.AlbumService;
import com.diary.drawing.domain.email.EmailVerificationService;
import com.diary.drawing.domain.user.domain.Member;
import com.diary.drawing.domain.user.dto.GetMemberDTO;
import com.diary.drawing.domain.user.dto.MemberDTO;
import com.diary.drawing.domain.user.dto.MemberJoinDTO;
import com.diary.drawing.domain.user.dto.PersonalityUpdateDTO;
import com.diary.drawing.domain.user.dto.PhoneRequestDTO;
import com.diary.drawing.domain.user.dto.ThemeUpdateDTO;
import com.diary.drawing.domain.user.exception.MemberExceptionType;
import com.diary.drawing.domain.user.exception.MemberResponseException;
import com.diary.drawing.domain.user.repository.MemberRepository;
import com.diary.drawing.domain.user.service.MemberService;
import com.diary.drawing.domain.user.service.SmsVerificationService;
import com.diary.drawing.domain.user.service.StatisticsService;
import com.diary.drawing.global.jwt.domain.PrincipalDetails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@Tag(name = "Member", description = "Member API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")

public class MemberController {

    private final MemberService memberService;
    private final AlbumService albumService;
    private final MemberRepository memberRepository;
    private final SmsVerificationService smsVerificationService;
    private final StatisticsService staticsService;
    private final EmailVerificationService emailVerificationService;


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

    

    /*  성격 속성에 값 저장
    *   @Param String email
    */
    @Operation(summary = "성격 속성 저장")
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

    /* 테마 업데이트 api
     * @param int theme
     */
    @Operation(summary = "회원가입")
    @PutMapping("/theme")
    public ResponseEntity<?> updateTheme (@RequestBody ThemeUpdateDTO themeUpdateDTO,
                                            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        return memberService.updateTheme(principalDetails.getMemberID(), themeUpdateDTO.getTheme());
    }

    
    /*  비밀번호 확인
     * @Param String oldpassword
     */
    @Operation(summary = "비밀번호 확인", description = "ok일때: 200, boolean 형식 true / 틀렸을때 : 601 error, wrongpassword")
    @PostMapping("/password")
    public ResponseEntity<?> verifyPassword(@RequestBody MemberDTO.passwordCheck oldpassword, @AuthenticationPrincipal PrincipalDetails principalDetails){
        boolean isauthorized = memberService.validatePassword(principalDetails.getMemberID(), oldpassword);
        return ResponseEntity.ok(isauthorized);
    }


    /*  마이페이지 업데이트 api
     *  @Param
     *
     */
    @Operation(summary = "마이페이지 업데이트", description = " 업데이트 하지 않는 요소는 null 넣거나 아예 body에 포함하지 않음. / profileimage 지우고 싶다면  __NULL__ 입력")
    @PatchMapping("/mypage")
    public ResponseEntity<?> verify(@Valid @RequestBody MemberDTO.MemberUpdate memberDTO, @AuthenticationPrincipal PrincipalDetails principalDetails){
        return memberService.patchMypage(principalDetails.getMemberID(), memberDTO);
    }


    /* 문자 인증 코드 보내는 api
     *  @param String phoneNumber
     */
    @Operation(summary = "문자 인증 코드 생성/전달")
    @PostMapping("/sms/codesending")
    public ResponseEntity<String> phoneNumberConfirm(@RequestBody PhoneRequestDTO.codeSendingDTO codeSendingDTO) {
        try{
            String code = memberService.sendSms(codeSendingDTO.getPhoneNumber());
            smsVerificationService.saveVerificationCode(codeSendingDTO.getPhoneNumber(), code);
            return new ResponseEntity<String>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
    }

    /* 문자 인증 코드 확인하는 api
     * @Param String email, String code
     * return email or error
     */
    @Operation(summary = "문자 인증 코드 확인")
    @PostMapping("/sms/verify")
    public ResponseEntity<?> phoneNumberVerify(@RequestBody PhoneRequestDTO.verifyDTO verifyDTO){
        return memberService.findEmailByPhoneNumber(verifyDTO.getPhoneNumber(), verifyDTO.getCode());
    }

    /*  통계 화면 api
     *  @param : Static static
     */
    @Operation(summary = "통계페이지", description = "통계페이지")
    @GetMapping("/statistic")
    public ResponseEntity<?> statisticPage(@AuthenticationPrincipal PrincipalDetails principalDetails){
        return staticsService.makeStatics(principalDetails.getMemberID());
    }

    /* 이메일 인증으로 패스워드 리셋하는 api
     * 
     */
    @PostMapping("/member/resetpassword")
    public ResponseEntity<?> verifyAndResetPassword(@RequestBody MemberDTO.resetPassword dto) throws Exception {
        return memberService.setTempPassword(dto.getEmail());
    }
    

    

}
