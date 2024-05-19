import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import LoginBar from "../components/LoginBar";

import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../auth/context/AuthContext";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled(Link)`
  font-size: 40px;
  font-weight: 800;
  padding-bottom: 30px;
  text-decoration: none;
  color: black;
`;

const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 70px 80px 40px 80px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 400px;
  height: 250px;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  margin-top: 20px;
`;

const JoinBtn = styled(Link)`
  padding-left: 10px;
  color: #090071;
  opacity: 0.8;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
`;

const LoginLostBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const LoginLostBtn = styled(Link)`
  width: 48%;
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

const ErrorMessage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: gray;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  margin: 6px;
  background-color: rgba(106, 156, 253, 0.5);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
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

    // 입력값 검증
    const specialCharacters = /['";\\<>\[\]\{\}\|\&=]/;
    if (specialCharacters.test(email) || specialCharacters.test(password)) {
      setErrorMessage("특수문자는 사용할 수 없습니다.");
      return;
    }

    axios
      .post("http://localhost:8080/api/login", {
        email,
        password,
      })
      .then((response) => {
        login(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.memberID
        );
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
    <Body>
      <Title to="/">감성 일기</Title>
      <LoginBox onSubmit={handleLogin}>
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
          <LoginButton type="submit">로그인</LoginButton>
        </InnerBox>
        <BtnBox>
          <JoinBtn to="/join">회원가입</JoinBtn>
        </BtnBox>
        <LoginLostBtnBox>
          <LoginLostBtn to="/email">아이디 찾기</LoginLostBtn>
          <LoginLostBtn to="/password">비밀번호 찾기</LoginLostBtn>
        </LoginLostBtnBox>
      </LoginBox>
    </Body>
  );
}

export default LoginPage;