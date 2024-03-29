import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import Background from "../components/Background";
import LoginBar from "../components/LoginBar";
import LoginBtn from "../components/LoginBtn";

import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axiosInstance from "../axios/axisoInstance";
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
  width: 800px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 70px 80px 40px 80px;
  box-sizing: border-box;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 70%;
  height: 100%;
`;

const JoinBtn = styled(Link)`
  padding-left: 30px;
  color: #989898;
  opacity: 0.8;
  font-weight: 800;
  font-size: 16px;
  text-decoration: none;
`;

const RightBox = styled.div`
  width: 30%;
  height: 100%;
  padding: 30px 10px 110px 55px;
  box-sizing: border-box;
`;

const LoginLostBtn = styled(Link)`
  width: 800px;
  font-size: 20px;
  font-weight: 800;
  color: #090071;
  text-align: right;
  text-decoration: none;
  padding-top: 18px;
  font-size: 18px;
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

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/login", {
        email,
        password,
      })
      .then((response) => {
        login(response.data.accessToken, response.data.memberID);
        navigate("/calendar");
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
    <Background>
      <Body>
        <Title>감성 일기</Title>
        <LoginBox>
          <LeftBox>
            <LoginBar
              icon={<IoMdPerson />}
              text="아이디"
              onChange={(e) => setEmail(e.target.value)}
            ></LoginBar>
            <LoginBar
              icon={<FaLock />}
              text="비밀번호"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></LoginBar>
            <ErrorMessageContainer>
              {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
            </ErrorMessageContainer>
            <JoinBtn to="/join">회원가입</JoinBtn>
          </LeftBox>
          <RightBox>
            <LoginBtn text="로그인" onClick={handleLogin} />
          </RightBox>
        </LoginBox>
        <LoginLostBtn to="/loginlost">
          아이디·비밀번호를 잃어버리셨나요?{" "}
        </LoginLostBtn>
      </Body>
    </Background>
  );
}

export default LoginPage;
