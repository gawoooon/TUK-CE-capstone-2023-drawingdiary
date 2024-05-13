import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Background from "../components/Background/index2";
import LoginBar from "../components/LoginBar";
import LoginBtn from "../components/LoginBtn";

import { MdPhoneAndroid } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoginBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 5px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 20px;
  box-sizing: border-box;
`;

const LoginBox = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px 20px 60px;
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
  justify-content: center;
  width: 70%;
  height: 70px;
  padding-top: 10px;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 30px;
`;

const RightBox = styled.div`
  display: flex;

  width: 25%;
  height: 100%;
`;

const BtnBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  align-items: center;
  cursor: pointer;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 0 3px 20px;
  min-height: 20px;
  padding: 30px 0px 0px 250px;
`;

const Message = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color};
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

  const navigate = useNavigate();

  const handlePhonePost = async (event) => {
    event.preventDefault();
    console.log("phoneNumber: ", phoneNumber);
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

  const handleClose = () => {
    navigate("/login");
  };

  return (
    <Background>
      <Body>
        <LoginBody>
          <BtnBox>
            <IoClose size={40} onClick={handleClose} />
          </BtnBox>
          <LoginBox>
            <Title>이메일 찾기</Title>
            <Content>
              계속하려면 회원님의 전화번호를 입력해주세요. 이를 통해 본인 확인을
              진행합니다.
            </Content>
            <PasswdBox>
              <LeftBox>
                <LoginBar
                  icon={<MdPhoneAndroid />}
                  text="전화번호"
                  value={phoneNumber}
                  phoneNumber={phoneNumber}
                  verifyMessage={verifyMessage}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></LoginBar>
              </LeftBox>
              <RightBox>
                <LoginBtn text="전송" onClick={handlePhonePost} />
              </RightBox>
            </PasswdBox>
            <PasswdBox>
              <LeftBox>
                <LoginBar
                  text="인증번호 입력"
                  onChange={(e) => setVerifyNumber(e.target.value)}
                ></LoginBar>
              </LeftBox>
              <RightBox>
                <LoginBtn text="확인" onClick={handleVerify} />
              </RightBox>
            </PasswdBox>
            <MessageContainer>
              {verifyEmail === true && (
                <Message color="#989898">
                  <>
                    회원님의 인증번호는{"   "}
                    <span style={{ color: "green" }}>[ {newEmail} ] </span>
                    {"   "} 입니다.
                  </>
                </Message>
              )}
              {verifyEmail === false && (
                <Message color="red">인증번호가 일치하지 않습니다.</Message>
              )}
            </MessageContainer>
          </LoginBox>
        </LoginBody>
      </Body>
    </Background>
  );
}

export default EmailLostPage;
