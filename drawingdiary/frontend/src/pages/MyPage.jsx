import React, { useState } from "react";
import styled from "styled-components";
import Background from "../components/Background";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import Information from "../components/mypage/Information";
import Profile from "../components/mypage/Profile";
import Thema from "../components/mypage/Thema";
import Popup from "../components/mypage/Popup";

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
  padding: 50px 150px;
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

function MyPage() {
  const [backgroundColor, setBackgroundColor] = React.useState(2);
  const [isPopupVisible, setPopupVisible] = useState(false); // 팝업 창의 가시성을 관리하는 상태

  // 팝업 창을 토글하는 함수
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <Background backgroundColor={backgroundColor}>
        <ShortSidebar />
        <MyPageBody>
          <MyPageBox>
            <MyPageTopBox>
              <Profile />
              <Thema onColorChange={setBackgroundColor} />
            </MyPageTopBox>
            <MyPageBottomBox>
              <Information onPopupToggle={togglePopup} />
            </MyPageBottomBox>
          </MyPageBox>
        </MyPageBody>
        {isPopupVisible && <Popup onClose={togglePopup} />}
      </Background>
    </div>
  );
}

export default MyPage;
