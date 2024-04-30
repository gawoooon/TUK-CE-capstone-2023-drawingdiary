import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import PopupLine from "./PopupLine";
import { RiLock2Fill } from "react-icons/ri";

// 팝업창
const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* 어두운 배경 색상 */
  z-index: 999; /* 모달보다 낮은 z-index를 설정하여 모달 위로 올라오도록 함 */
`;

const PopupBox = styled.div`
  width: 500px;
  height: 750px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  box-sizing: border-box;
`;

// 팝업창 상단
const PopupTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7%;
`;

const PopupTopText = styled.div`
  font-size: 20px;
`;

const PopupTopCloseBtn = styled.button`
  border: none;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
`;

// 팝업창 하단 - 수정 버튼
const PopupBottom = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const jumpAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const PopupBottomEditBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: rgba(106, 156, 253, 0.3);
  box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    animation: ${jumpAnimation} 0.5s ease;
  }
`;

// 팝업창 중단
const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 86%;
  box-sizing: border-box;
  padding: 10px 0;
`;

// 프로필
const ProfileTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 17%;
  background-color: white;
  border-bottom: 2px solid rgba(106, 156, 253, 0.4);
  margin-bottom: 20px;
  padding: 10px 0px;
`;

// 프로필 이미지
const ProfileImgBox = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  align-items: end;
`;

const ProfileImg = styled.img`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50px;
  object-fit: contain;
`;

// 프로필 이름
const ProfileName = styled.input`
  display: flex;
  align-items: end;
  width: 140px;
  height: 50px;
  font-size: 20px;
  padding: 5px;
  margin: 0px 10px;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #a3a3a3;
  ::placeholder {
    color: #a3a3a3;
  }
  border-bottom: 2px solid rgb(144, 144, 144);
`;

// 프로필 이미지 업로드
const ProfileImgUpload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  font-size: 20px;
  color: rgb(144, 144, 144);
  border: 2px solid rgb(144, 144, 144);
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  /* 파일 업로드를 위한 숨겨진 input */
  display: none;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50px;
`;

// 팝업창
const PopupLineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px 10px 10px;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
`;

const PopupLineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
`;

const PopupLineInput = styled.input`
  width: 250px;
  height: 100%;
  outline: none;
  font-size: 13px;
  border: none;
  border-bottom: 1px solid rgba(56, 56, 56, 0.4);
`;

const PopupLineTitle = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 100%;
  font-size: 15px;
  font-weight: bold;
`;

const PopupLineBtn = styled.button`
  width: 50px;
  height: 30px;
  background-color: white;
  border: 2px solid rgba(106, 156, 253, 0.4);
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-size: 13px;
  text-align: center;
  outline: none;
  font-weight: bold;
`;

const PopupLineBtnBox = styled.div`
  width: 70px;
  height: 100%;
  background-color: white;
`;

// 인증 문구
const MessageContainer = styled.div`
  margin: 0 0 3px 20px;
  min-height: 20px;
`;

const Message = styled.text`
  font-size: 12px;
  font-weight: bold;
  color: red;
`;

function Popup({ onClose }) {
  const accessToken = localStorage.getItem("accessToken");
  const [setName, setSetName] = useState("");
  const [profileImage, setProfileImage] = useState(null); // 업로드한 이미지 상태 추가

  // 문자 인증
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCertification, setPhoneCertification] = useState("");
  const [verifySnsMessage, setVerifySnsMessage] = useState("");
  const [errorSnsMessage, setErrorSnsMessage] = useState("");

  // 이메일 인증
  const [userEmail, setUserEmail] = useState("");
  const [certification, setCheckCertification] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 파일 선택 시 이벤트 처리 함수
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      convertToBase64(selectedFile, (base64Image) => {
        console.log(base64Image); // base64 문자열 출력
        setProfileImage(base64Image);
      });
    }
  };

  // 파일을 base64로 변환하는 함수
  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error("Error: ", error);
  };

  // setName을 placeholder로 보내기
  useEffect(() => {
    const storedName = localStorage.getItem("setName");
    if (storedName) {
      setSetName(storedName);
    }
  }, []);

  // 문자 인증
  const sendPhone = async (event) => {
    event.preventDefault();
    console.log("phoneNumber: ", phoneNumber);
    if (phoneNumber !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/sms/codesending",
          { phoneNumber: phoneNumber },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("response", response);
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      alert("핸드폰 번호를 입력해주세요!");
    }
  };

  const verifyPhoneCertification = async (event) => {
    event.preventDefault();
    if (phoneCertification !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/sms/verify",
          {
            phoneNumber: phoneNumber,
            code: phoneCertification,
          }
        );
        console.log("response: ", response);
        setVerifySnsMessage("인증되었습니다.");
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  // 이메일 인증
  const sendEmail = async (event) => {
    event.preventDefault();
    console.log("userEmail: ", userEmail);
    if (userEmail !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/email/codesending",
          { email: userEmail },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("response", response);
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      alert("이메일을 입력해주세요!");
    }
  };

  const verifyCertification = async (event) => {
    event.preventDefault();
    if (certification !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/email/verify",
          {
            email: userEmail,
            verificationCode: certification,
          }
        );
        console.log("response: ", response);
        setVerifyMessage("이메일이 인증되었습니다.");
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  useEffect(() => {
    if (errorSnsMessage) {
      setTimeout(() => {
        setErrorSnsMessage("");
      }, 2000);
    }

    if (verifySnsMessage) {
      setTimeout(() => {
        setVerifySnsMessage("");
      }, 2000);
    }
  }, [errorSnsMessage, verifySnsMessage]);

  useEffect(() => {
    if (errorSnsMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }

    if (verifySnsMessage) {
      setTimeout(() => {
        setVerifyMessage("");
      }, 2000);
    }
  }, [errorMessage, verifyMessage]);

  return (
    <>
      <BackgroundOverlay />
      <PopupBox>
        <PopupTop>
          <PopupTopText>기본정보</PopupTopText>
          <PopupTopCloseBtn onClick={onClose}>X</PopupTopCloseBtn>
        </PopupTop>

        <PopupBody>
          <ProfileTop>
            <ProfileImgBox>
              <ProfileImg src={profileImage}></ProfileImg>
            </ProfileImgBox>
            <ProfileName
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
            <ProfileImgUpload>
              사진올리기
              <HiddenFileInput
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </ProfileImgUpload>
          </ProfileTop>

          <PopupLineBox>
            <PopupLineIcon>
              <MdOutlinePhoneIphone size={28} />
            </PopupLineIcon>
            <PopupLineInput
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="전화번호"
            />
            <PopupLineBtn onClick={(e) => sendPhone(e)}>인증</PopupLineBtn>
          </PopupLineBox>

          <PopupLineBox>
            <PopupLineIcon></PopupLineIcon>
            <PopupLineInput
              id="phoneCertification"
              value={phoneCertification}
              onChange={(e) => setPhoneCertification(e.target.value)}
              placeholder="인증번호 입력"
            />
            <PopupLineBtn onClick={(e) => verifyPhoneCertification(e)}>
              확인
            </PopupLineBtn>
          </PopupLineBox>

          <MessageContainer>
            {errorSnsMessage && <Message> {errorSnsMessage} </Message>}
            {verifySnsMessage && <Message> {verifySnsMessage} </Message>}
          </MessageContainer>

          <PopupLineBox>
            <PopupLineIcon>
              <MdEmail size={28} />
            </PopupLineIcon>
            <PopupLineTitle>아이디 변경</PopupLineTitle>
            <PopupLineBtnBox></PopupLineBtnBox>
          </PopupLineBox>

          <PopupLineBox>
            <PopupLineIcon></PopupLineIcon>
            <PopupLineInput
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="새로운 이메일 입력"
            />
            <PopupLineBtn onClick={(e) => sendEmail(e)}>인증</PopupLineBtn>
          </PopupLineBox>

          <PopupLineBox>
            <PopupLineIcon></PopupLineIcon>
            <PopupLineInput
              id="certification"
              value={certification}
              onChange={(e) => setCheckCertification(e.target.value)}
              placeholder="인증번호 입력"
            />
            <PopupLineBtn onClick={(e) => verifyCertification(e)}>
              확인
            </PopupLineBtn>
          </PopupLineBox>

          <MessageContainer>
            {errorMessage && <Message> {errorMessage} </Message>}
            {verifyMessage && <Message> {verifyMessage} </Message>}
          </MessageContainer>

          <PopupLine icon={RiLock2Fill} title="비밀번호 변경" />
          <PopupLine text="확인" placeholder="현재 비밀번호 입력" />
          <PopupLine placeholder="새로운 비밀번호 입력" />
          <PopupLine placeholder="비밀번호 확인" />
        </PopupBody>
        <PopupBottom>
          <PopupBottomEditBtn>수정</PopupBottomEditBtn>
        </PopupBottom>
      </PopupBox>
    </>
  );
}

export default Popup;
