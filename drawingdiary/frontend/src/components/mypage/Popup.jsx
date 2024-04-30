import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import PopupLine from "./PopupLine";
import { RiLock2Fill } from "react-icons/ri";

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

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 86%;
  box-sizing: border-box;
  padding: 10px 0;
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 17%;
  background-color: white;
  border-bottom: 2px solid rgba(106, 156, 253, 0.4);
  margin-bottom: 20px;
`;

const ProfileTopBody = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  background-color: white;
  padding: 10px 0px;
  box-sizing: border-box;
`;

const ProfileImgNameBox = styled.div`
  display: flex;
  width: 65%;
  height: 100%;
  align-items: end;
`;

const ProfileImg = styled.img`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50px;
  object-fit: contain;
`;
const ProfileNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  box-sizing: border-box;
  color: rgb(144, 144, 144);
  border-bottom: 2px solid rgb(144, 144, 144);
  width: 150px;
  height: 45px;
\
`;

const ProfileName = styled.input`
  width: 140px;
  font-size: 20px;
  padding: 5px;
  box-sizing: border-box;
  outline: none;
  border: none;
  color: #a3a3a3;
  ::placeholder {
    color: #a3a3a3;
  }
`;

const ProfileImgUploadBox = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
`;

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

const paddingForTitle = css`
  padding: 10px 10px 0 10px;
`;

const PopupLineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px 10px 10px;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  ${(props) => props.hasTitle && paddingForTitle}
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

// const PopupLineTitle = styled.div`
//   display: flex;
//   align-items: center;
//   width: 250px;
//   height: 100%;
//   font-size: 15px;
//   font-weight: bold;
// `;

const PopupLineBtnBox = styled.div`
  width: 70px;
  height: 100%;
`;

const PopupLineBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid rgba(106, 156, 253, 0.4);
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-size: 13px;
  text-align: center;
  outline: none;
`;

function Popup({ onClose }) {
  const accessToken = localStorage.getItem("accessToken");
  const [setName, setSetName] = useState("");
  const [profileImage, setProfileImage] = useState(null); // 업로드한 이미지 상태 추가

  // 문자 인증
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
            <ProfileTopBody>
              <ProfileImgNameBox>
                <ProfileImg src={profileImage}></ProfileImg>
                <ProfileNameBox>
                  <ProfileName
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                  />
                </ProfileNameBox>
              </ProfileImgNameBox>
              <ProfileImgUploadBox>
                <ProfileImgUpload>
                  사진올리기
                  <HiddenFileInput
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </ProfileImgUpload>
              </ProfileImgUploadBox>
            </ProfileTopBody>
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
            {/* <PopupLineTitle>인증</PopupLineTitle> */}
            <PopupLineBtnBox>
              <PopupLineBtn onClick={(e) => sendPhone(e)}>인증</PopupLineBtn>
            </PopupLineBtnBox>
          </PopupLineBox>

          <PopupLine text="확인" placeholder="인증번호 입력" />
          <PopupLine icon={MdEmail} title="아이디 변경" />
          {/* <PopupLine text="확인" placeholder="현재 이메일 입력" /> */}

          <PopupLineBox>
            <PopupLineIcon></PopupLineIcon>
            <PopupLineInput
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="새로운 이메일 입력"
            />
            {/* <PopupLineTitle>인증</PopupLineTitle> */}
            <PopupLineBtnBox>
              <PopupLineBtn onClick={(e) => sendEmail(e)}>인증</PopupLineBtn>
            </PopupLineBtnBox>
          </PopupLineBox>

          <PopupLine text="확인" placeholder="인증번호 입력" />
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
