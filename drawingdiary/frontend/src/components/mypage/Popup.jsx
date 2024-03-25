import styled from "styled-components";
import { MdOutlinePhoneIphone } from "react-icons/md";

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
  width: 600px;
  height: 700px;
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
  padding: 20px;
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
`;

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 86%;
  box-sizing: border-box;
  padding: 10px 20px;
`;

const ProfileTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: white;
  border-bottom: 2px solid rgb(144, 144, 144);
`;

const ProfileTopBody = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  background-color: white;
`;

const ProfileImgNameBox = styled.div`
  display: flex;
  align-items: center;
  width: 65%;
  height: 100%;
`;

const ProfileImg = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50px;
  background-color: pink;
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

const ProfileImgUpload = styled.button`
  width: 150px;
  height: 40px;
  background-color: white;
  border-radius: 10px;
  font-size: 20px;
  color: rgb(144, 144, 144);
  border: 2px solid rgb(144, 144, 144);
  cursor: pointer;
`;

const PopupLineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
`;

const PopupLineIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 15%;
  height: 100%;
`;

const PopupLineInput = styled.input`
  width: 60%;
  height: 100%;
  outline: none;
  font-size: 13px;
  border: none;
  border-bottom: 1px solid rgba(56, 56, 56, 0.4);
`;

const PopupLineBtn = styled.button`
  width: 10%;
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
                <ProfileImg></ProfileImg>
                <ProfileName>NAME</ProfileName>
              </ProfileImgNameBox>
              <ProfileImgUploadBox>
                <ProfileImgUpload>사진올리기</ProfileImgUpload>
              </ProfileImgUploadBox>
            </ProfileTopBody>
          </ProfileTop>
          <PopupLineBox>
            <PopupLineIcon>
              <MdOutlinePhoneIphone size={28} />
            </PopupLineIcon>
            <PopupLineInput placeholder="전화번호" />
            <PopupLineBtn>인증</PopupLineBtn>
          </PopupLineBox>
        </PopupBody>
        <PopupBottom>
          <PopupBottomEditBtn>수정</PopupBottomEditBtn>
        </PopupBottom>
      </PopupBox>
    </>
  );
}

export default Popup;
