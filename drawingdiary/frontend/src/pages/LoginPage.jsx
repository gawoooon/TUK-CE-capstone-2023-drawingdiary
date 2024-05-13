import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import Background2 from "../components/Background/index2";
import LoginBar from "../components/LoginBar";

import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../auth/context/AuthContext";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 800;
  padding-bottom: 30px;
`;

const LoginBox = styled.form`
  display: flex;
  width: 600px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 70px 80px 40px 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 400px;
  height: 250px
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  height: 50px;
  width: 100%;
`;

const JoinBtn = styled(Link)`
  padding-left: 10px;
  color: #090071;
  opacity: 0.8;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
`;

const LoginLostBtn = styled(Link)`
  width: 100%;
  height: 30px;
  font-size: 12px;
  font-weight: 500;
  color: #090071;
  text-align: center;
  text-decoration: none;
  padding-top: 18px;
`;

const ErrorMessageContainer = styled.div`
  margin: 0 0 3px 20px;
  min-height: 20px;
`;

const ErrorMessage = styled.text`
  font-size: 12px;
  font-weight: bold;
  color: gray;
  font-weight: bold;
`;

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  localStorage.setItem("selectedColor", 0);

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("refresh token: ", response.data.refreshToken);
        login(response.data.accessToken, response.data.refreshToken, response.data.memberID);
        navigate("/");
      })
      .catch((error) => {
        console.log("에러 status: ", error.code);
        if (error.response && error.response.status === 500) {
          console.log("로그인 실패: 잘못된 자격증명입니다.");
        } else if (error.response && error.response.status === 403) {
          setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
          console.log("Error: ", error.response.data.message);
        } else {
          console.log("Error: ", error);
        }
      });
  };

  return (
    <Background2>
      <Body>
        <Title>감성 일기</Title>
        <LoginBox>
          <InnerBox>
            <LoginBar
              icon={<IoMdPerson size={20} />}
              text="아이디"
              onChange={(e) => setEmail(e.target.value)}
            ></LoginBar>
            <LoginBar
              icon={<FaLock size={20} />}
              text="비밀번호"
              type="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></LoginBar>
            <ErrorMessageContainer>
              {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
            </ErrorMessageContainer>
            <BtnBox>
              <JoinBtn to="/login" onClick={handleLogin}>로그인</JoinBtn>
              <JoinBtn to="/join">회원가입</JoinBtn>
            </BtnBox>
            <LoginLostBtn to="/loginlost">
              아이디·비밀번호를 잃어버리셨나요?{" "}
            </LoginLostBtn>
          </InnerBox>
        </LoginBox>
      </Body>
    </Background2>
  );
}

export default LoginPage;
