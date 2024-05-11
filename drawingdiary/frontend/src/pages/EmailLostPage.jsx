import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import Background from "../components/Background";
import LoginBar from "../components/LoginBar";
import LoginBtn from "../components/LoginBtn";

import { IoMdPerson } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 5px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 100px 80px;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 800;
  padding-bottom: 20px;
`;

const Content = styled.p`
  font-size: 20px;
  font-weight: 800;
  padding-top: 10px;
  color: #989898;
  padding-bottom: 30px;
`;

const PasswdBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 70px;
  padding-top: 10px;
`;

const LeftBox = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  padding-right: 30px;
`;

const RightBox = styled.div`
  display: flex;
  width: 20%;
  height: 100%;
`;

const LoginBtn2 = styled(Link)`
  font-size: 30px;
  font-weight: 800;
  padding-top: 30px;
  color: #616161;
  text-decoration: none;
`;

function EmailLostPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직을 처리한 후 '/calendar' 페이지로 이동
    navigate("/calendar");
  };

  return (
    <Background>
      <Body>
        <LoginBox>
          <Title>이메일 찾기</Title>
          <Content>
            계속하려면 회원님의 전화번호를 입력해주세요. 이를 통해 본인 확인을
            진행합니다.
          </Content>
          <PasswdBox>
            <LeftBox>
              <LoginBar icon={<MdPhoneAndroid />} text="전화번호"></LoginBar>
            </LeftBox>
            <RightBox>
              <LoginBtn text="전송" onClick={handleLogin} />
            </RightBox>
          </PasswdBox>
          <PasswdBox>
            <LeftBox>
              <LoginBar text="인증번호 입력"></LoginBar>
            </LeftBox>
            <RightBox>
              <LoginBtn text="확인" onClick={handleLogin} />
            </RightBox>
          </PasswdBox>
          <PasswdBox>
            <LeftBox>
              <LoginBar icon={<IoMdPerson />} text="전화번호"></LoginBar>
            </LeftBox>
            <RightBox>
              <LoginBtn text="전송" onClick={handleLogin} />
            </RightBox>
          </PasswdBox>
          <LoginBtn2 to="/calendar">로그인</LoginBtn2>
        </LoginBox>
      </Body>
    </Background>
  );
}

export default EmailLostPage;
