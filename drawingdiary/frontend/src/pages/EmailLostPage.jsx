import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginBar from "../components/LoginBar";
import LoginBtn from "../components/LoginBtn";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const LoginBody = styled.section`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 430px;
  border-radius: 30px;
  padding: 20px;
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

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  padding: 20px 0;
`;

const Content = styled.p`
  font-size: 16px;
  padding: 10px 0;
  color: #989898;
`;

const PhoneSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const NumberSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 30px;
  margin: 10px 0;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Message = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${(props) => props.color};
`;

const GoLogin = styled(Link)`
  font-size: 16px;
  padding-bottom: 10px;
  color: #0d0d0d;
`;

function EmailLostPage() {
  // 핸드폰 번호, 인증번호
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");

  // 핸드폰 인증 확인, 새로운 이메일 확인
  const [verifyMessage, setVerifyMessage] = useState(null);
  const [verifyEmail, setVerifyEmail] = useState(null);

  // 새로운 이메일
  const [newEmail, setNewEmail] = useState("");

  const handlePhonePost = async (event) => {
    event.preventDefault();
    if (phoneNumber !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/sms/codesending-existed",
          { phoneNumber: phoneNumber },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        setVerifyMessage(true);
      } catch (error) {
        console.log("error: ", error);
        setVerifyMessage(false);
      }
    } else {
      alert("핸드폰 번호를 입력해주세요!");
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    console.log("verifyNumber: ", verifyNumber);
    if (verifyNumber !== "") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/sms/verify-existed",
          { phoneNumber: phoneNumber, code: verifyNumber },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        setVerifyEmail(true);
        setNewEmail(response.data.email);
      } catch (error) {
        console.log("error: ", error);
        setVerifyEmail(false);
      }
    } else {
      alert("인증번호를 입력해주세요!");
    }
  };


  return (
    <Body>
      <LoginBody>
        <Title>이메일 찾기</Title>
        <Content>
          계속하려면 회원님의 전화번호를 입력해주세요. 이를 통해 본인 확인을
          진행합니다.
        </Content>
        <InnerBox>
          <PhoneSection>
            <LoginBar
              text="전화번호"
              value={phoneNumber}
              phoneNumber={phoneNumber}
              verifyMessage={verifyMessage}
              onChange={(e) => setPhoneNumber(e.target.value)} />
            <LoginBtn text="전송" onClick={handlePhonePost} />
          </PhoneSection>
          <NumberSection>
            <LoginBar
              text="인증번호 입력"
              onChange={(e) => setVerifyNumber(e.target.value)} />
            <LoginBtn text="확인" onClick={handleVerify} />
          </NumberSection>
        </InnerBox>
        <MessageContainer>
          {verifyEmail === true && (
            <Message color="#989898">
              <>
                회원님의 이메일은{"   "}
                <span style={{ color: "green" }}>[ {newEmail} ] </span>
                {"   "} 입니다.
              </>
            </Message>
          )}
          {verifyEmail === false && (
            <Message color="red">인증번호가 일치하지 않습니다.</Message>
          )}
        </MessageContainer>
        <GoLogin to='/login'>로그인</GoLogin>
      </LoginBody>
    </Body>
  );
}

export default EmailLostPage;
