import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background/index2";
import LoginBar from "../components/LoginBar";
import LoginBtn from "../components/LoginBtn";

import { MdEmail } from "react-icons/md";
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
  padding: 20px 40px;
  box-sizing: border-box;
`;

const LoginBox = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 60px 30px 60px;
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
  padding-top: 1px;
  color: #989898;
`;

const PasswdBox = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 70px;
  padding-top: 70px;
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
  margin: 0 0 3px 20px;
  min-height: 20px;
  padding: 10px 0px 0px 250px;
`;

const Message = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
`;

function PasswordLostPage() {
  const [email, setEmail] = useState("");
  const [verifyMessage, setVerifyMessage] = useState(null);

  const navigate = useNavigate();

  const handlePost = async (event) => {
    event.preventDefault();
    console.log(email);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/member/resetpassword",
        { email: email },
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
  };

  // if (verifyMessage) {
  //   setTimeout(() => {
  //     setVerifyMessage("");
  //   }, 2000);
  // }

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
            <Title>암호 재설정</Title>
            <Content>
              계속하려면 계정에서 사용하는 이메일주소를 입력하세요.
            </Content>
            <Content>
              전송 버튼을 누르면 해당 이메일로 임시 비밀번호가 전송됩니다.
            </Content>
            <PasswdBox>
              <LeftBox>
                <LoginBar
                  icon={<MdEmail />}
                  text="이메일"
                  onChange={(e) => setEmail(e.target.value)}
                ></LoginBar>
              </LeftBox>
              <RightBox>
                <LoginBtn text="전송" onClick={handlePost} />
              </RightBox>
            </PasswdBox>

            <MessageContainer>
              {verifyMessage === true && (
                <Message color="green">임시 비밀번호를 전송하였습니다.</Message>
              )}
              {verifyMessage === false && (
                <Message color="red">이메일이 일치하지 않습니다.</Message>
              )}
            </MessageContainer>
          </LoginBox>
        </LoginBody>
      </Body>
    </Background>
  );
}

export default PasswordLostPage;
