import styled, { keyframes } from "styled-components";
import { useState } from "react"; // useState 추가
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
  border-bottom: 2px solid rgb(144, 144, 144);
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
  align-items: center;
  width: 65%;
  height: 100%;
`;

const ProfileImg = styled.img`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50px;
  object-fit: contain;
`;

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  box-sizing: border-box;
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

function Popup({ onClose }) {
  const [profileImage, setProfileImage] = useState(null); // 업로드한 이미지 상태 추가

  // 파일 선택 시 이벤트 처리 함수
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setProfileImage(imageUrl);
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
                <ProfileName>NAME</ProfileName>
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
          <PopupLine
            icon={MdOutlinePhoneIphone}
            text="인증"
            placeholder="전화번호"
          />
          <PopupLine placeholder="인증번호 입력" />
          <PopupLine icon={MdEmail} title="이메일 변경" />
          <PopupLine text="확인" placeholder="현재 이메일 입력" />
          <PopupLine text="인증" placeholder="새로운 이메일 입력" />
          <PopupLine placeholder="인증번호 입력" />
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
