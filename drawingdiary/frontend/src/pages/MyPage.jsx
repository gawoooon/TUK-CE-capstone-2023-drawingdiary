import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Background from "../components/Background/index2";
import NavBar from "../components/sidebar/NavBar";
import Information from "../components/mypage/Information";
import Profile from "../components/mypage/Profile";
import Theme from "../components/mypage/Theme";
import Popup from "../components/mypage/Popup";
import PopupPassword from "../components/mypage/PopupPassword";
import axios from "axios";
import { useAuth } from "../auth/context/AuthContext";

const MyPageBackground = styled.div`
  width: 100%;
  height: 100vh;
`;

const MyPageBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MyPageBox = styled.div`
  width: 900px;
  height: 800px;
  background-color: white;
  box-shadow: 3px 10px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 50px 155px;
  box-sizing: border-box;
`;

const MyPageTopBox = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyPageBottomBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MyPageBodyBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function MyPage() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false); // 팝업 창의 가시성을 관리하는 상태
  const [isPopupPassword, setPopupPassword] = useState(false);

  const { memberID, getToken } = useAuth();
  const accessToken = getToken();
  const [profileImage, setProfileImage] = useState(null);
  const [profileEmail, setProfileEmail] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [profileBirth, setProfileBirth] = useState(null);
  const [profilePhone, setProfilePhone] = useState(null);

  // 팝업 창을 토글하는 함수
  const passwordPopup = () => {
    setPopupPassword(!isPopupPassword);
    setPopupVisible(false);
  };

  const PopupToggle = () => {
    setPopupVisible(!isPopupVisible);
    setPopupPassword(false);
  };

  const fetchUserName = useCallback(async () => {
    if (memberID) {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/get-member",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setProfileName(response.data.name);
        setProfileEmail(response.data.email);
        setProfileBirth(response.data.birth);

        if (response.data.phoneNumber === null) {
          setProfilePhone("전화번호를 등록해주세요");
          console.log("전화번호를 등록해주세요");
        } else {
          setProfilePhone(response.data.phoneNumber);
          console.log(profilePhone);
        }

        // 프로필 이미지가 있는 경우에만 설정
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }

        console.log(profileImage);
      } catch (error) {
        console.log("사용자의 이름을 불러오는 중 에러 발생: ", error);
      }
    }
  }, [memberID]);

  useEffect(() => {
    fetchUserName();
  }, [memberID, fetchUserName]);

  return (
    <MyPageBackground>
      <Background backgroundColor={backgroundColor}>
        <MyPageBodyBox>
          <NavBar />

          <MyPageBody>
            <MyPageBox>
              <MyPageTopBox>
                <Profile
                  profileImage={profileImage}
                  profileEmail={profileEmail}
                  profileName={profileName}
                />
                <Theme onColorChange={setBackgroundColor} />
              </MyPageTopBox>
              <MyPageBottomBox>
                <Information
                  onPopupPassword={passwordPopup}
                  profileBirth={profileBirth}
                  profileEmail={profileEmail}
                  profileName={profileName}
                  profilePhone={profilePhone}
                />
              </MyPageBottomBox>
            </MyPageBox>
          </MyPageBody>
        </MyPageBodyBox>
      </Background>
      {isPopupPassword && (
        <PopupPassword onClose={passwordPopup} onPopup={PopupToggle} />
      )}
      {isPopupVisible && (
        <Popup
          onClose={PopupToggle}
          profileImage={profileImage}
          profileName={profileName}
        />
      )}
    </MyPageBackground>
  );
}

export default MyPage;
