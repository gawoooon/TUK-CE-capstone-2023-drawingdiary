import React, { useState } from "react";
import styled from "styled-components";
import Background from "../components/Background/index2";
import NavBar from "../components/sidebar/NavBar";
import Information from "../components/mypage/Information";
import Profile from "../components/mypage/Profile";
import Theme from "../components/mypage/Theme";
import Popup from "../components/mypage/Popup";
import PopupPassword from "../components/mypage/PopupPassword";

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

// const NavBarBox = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: end;
// `;

function MyPage() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false); // 팝업 창의 가시성을 관리하는 상태
  const [isPopupPassword, setPopupPassword] = useState(false);

  // 팝업 창을 토글하는 함수
  const passwordPopup = () => {
    setPopupPassword(!isPopupPassword);
    setPopupVisible(false);
  };

  const PopupToggle = () => {
    setPopupVisible(!isPopupVisible);
    setPopupPassword(false);
  };

  return (
    <MyPageBackground>
      <Background backgroundColor={backgroundColor}>
        <MyPageBodyBox>
          <NavBar />

          <MyPageBody>
            <MyPageBox>
              <MyPageTopBox>
                <Profile />
                <Theme onColorChange={setBackgroundColor} />
              </MyPageTopBox>
              <MyPageBottomBox>
                <Information onPopupPassword={passwordPopup} />
                {/* <Information onPopupToggle={togglePopup} /> */}
              </MyPageBottomBox>
            </MyPageBox>
          </MyPageBody>
        </MyPageBodyBox>
      </Background>
      {isPopupPassword && (
        <PopupPassword onClose={passwordPopup} onPopup={PopupToggle} />
      )}
      {isPopupVisible && <Popup onClose={PopupToggle} />}
    </MyPageBackground>
  );
}

export default MyPage;
