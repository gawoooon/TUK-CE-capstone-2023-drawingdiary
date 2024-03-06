import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from "styled-components";
import axios from 'axios';
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
import LongInputField from '../components/input field/LongInputField';
import ShortInputField from '../components/input field/ShortInputField';

const ContainerStyle = styled.div`
  height: 670px;
  width: 530px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%; 
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  };
  input {
    border: none;
    border-bottom: 1px solid rgba(56, 56, 56, 0.4);
  }
  select {
    border: none;
    border-bottom: 1px solid rgba(56, 56, 56, 0.4);
  }
  input::placeholder {
    color: #808080;
    font-weight: 600;
  }
`;

const InputFieldStyle = styled.div`
  margin: 0px 15px 30px 15px;
`;

const EmailInputStyle = styled.input`
  height: 40px;
  width: 350px;
  padding-left: 10px;
  outline: none;
  font-size: 13px;
`;

const SelectMonthContainer = styled.select`
  height: 45px;
  width: 125px;
  margin: 0px 15px 31px 15px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const SelectGenderContainer = styled.select`
  height: 45px;
  width: 435px;
  margin: 0px 15px 15px 15px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const BirthDayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const ConfilmPasswordStyle = styled.input`
  height: 40px;
  width: 420px;
  padding-left: 10px;
  outline: none;
  font-size: 13px;
`;

const VerifyButton = styled.button `
  height: 40px;
  width: 60px;
  margin-left: 10px;
  background-color: white;
  border: 2px solid rgba(106, 156, 253, 0.4);
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-size: 13px;
  text-align: center;
  outline: none;
`;

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const jumpAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const ButtonStyle = styled.button`
    height: 45px;
    width: 200px;
    margin-bottom: 30px;
    background-color: rgb(106, 156, 253, 0.3);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    color: black;
    font-size: 18px;
    font-weight: bold;
    outline: none;
    &:hover {
      animation: ${jumpAnimation} 0.5s ease;
    }
`;

const MessageContainer = styled.div`
  margin: 0 0 3px 20px;
  min-height: 20px;
`;

const Message = styled.text`
  font-size: 12px;
  font-weight: bold;
  color: red;
`;

const Divider = styled.hr`
  width: 80%; 
  border: none;
  height: 1px; 
  background-color: lightgray; 
  margin-top: 5px; 
  margin-bottom: 20px; 
`;

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [certification, setCheckCertification] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sendMessage, setSendMessage] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [animateNextBtn, setAnimateNextBtn] = useState(false);

    const navigate = useNavigate();

    const confirmPasswordRef = useRef();

    const handleSubmit = (event) => {

        event.preventDefault();

        if(!name || !year || !month || !day || !gender || !userEmail || !certification || !password || !confirmPassword || !isEmailVerified) {
          alert("모든 입력란을 채워주세요.");
          return;
        }

        // 비밀번호 일치 확인
        if(password !== confirmPassword) {
          alert("비밀번호가 일치하지 않습니다.");
          confirmPasswordRef.current.focus();
          return;
        }
  

        // 생일 형식 설정 부분
        const birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        // 성별 형식 변경
        let genderForm;
        if(gender === "female") {
          genderForm = "F";
        } else if(gender === "male") {
          genderForm = "M";
        } else {
          genderForm = "S";
        }

        console.log('Sending data:', { name, email: userEmail, password, birth, gender: genderForm });
        
        // 백엔드 api로 데이터 전송
        axios.post('http://localhost:8080/api/join', {
          name,
          email: userEmail,
          password,
          birth,
          gender: genderForm,
        })
        .then(response => {
          console.log('Success: ', response);
          navigate('/choosePersonality', { state: { email: userEmail, name }});
        })
        .catch(error => {
          if(error.response && error.response.status === 409) {
            setErrorMessage(error.response.data.message); // 에러 메시지 상태 업데이트
          } else {
            console.log('Error: ', error);
          }
        });

    };

    const sendEmail = async (event) => {
      event.preventDefault();
      console.log("userEmail: ", userEmail);
      if(userEmail !== '') {
        try {
          const response = await axios.post('http://localhost:8080/api/email/codesending', `${userEmail}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("response", response);
          setSendMessage("이메일이 전송되었습니다.");
        } catch (error) {
          console.log("error: ", error);
        }
      } else {
        alert("이메일을 입력해주세요!");
      }
    };

    const verifyCertification = async (event) => {
      event.preventDefault();
      if(certification !== ''){
        try {
          const response = await axios.post('http://localhost:8080/api/email/verify', {
            email: userEmail,
            verificationCode: certification
          });
          console.log("response: ", response);
          setIsEmailVerified(true);
          setVerifyMessage('이메일이 인증되었습니다.')
        } catch (error) {
          console.log("error: ", error);
        }
      }
    };

    useEffect(() => {
      if(errorMessage) {
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
      if(sendMessage) {
        setTimeout(() => {
          setSendMessage('');
        }, 2000);
      }
      if(verifyMessage) {
        setTimeout(() => {
          setVerifyMessage('');
        }, 2000);
      }
    }, [errorMessage, sendMessage, verifyMessage]);
      
    return (
        <Background>

          <ContainerStyle className='create-account-containers'>

            <h3>계정 만들기</h3>

            {/* <Divider/> */}

            <form autoComplete="off">

              <InputFieldStyle>

                <LongInputField
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                />

              </InputFieldStyle>

              <BirthDayContainer>

                <ShortInputField
                  id="year"
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="연"
                />

                <SelectMonthContainer 
                  name='month'
                  id='month'
                  value={month}
                  onChange={ (e) => setMonth(e.target.value)}
                  style={{ color: month === "" ? '#808080' : 'initial', paddingTop: '2px' }}>
                  <option value="" disabled style={{ color: 'grey'}}>월</option>
                  <option value="1">1월</option>
                  <option value="2">2월</option>
                  <option value="3">3월</option>
                  <option value="4">4월</option>
                  <option value="5">5월</option>
                  <option value="6">6월</option>
                  <option value="7">7월</option>
                  <option value="8">8월</option>
                  <option value="9">9월</option>
                  <option value="10">10월</option>
                  <option value="11">11월</option>
                  <option value="12">12월</option>

                </SelectMonthContainer>

                <ShortInputField
                  id="day"
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="일"
                />

              </BirthDayContainer>

              <SelectGenderContainer
                name='gender'
                id='gender'
                value={gender}
                onChange={ (e) => setGender(e.target.value)}
                style={{ color: month === "" ? '#808080' : 'initial' }}>
                <option value="" disabled style={{ color: 'grey'}}>성별</option>
                <option value="female">여자</option>
                <option value="male">남자</option>
                <option value="secret">공개안함</option>
              </SelectGenderContainer>

              <MessageContainer>
                {errorMessage && ( <Message> {errorMessage} </Message> )}
                {sendMessage && ( <Message> {sendMessage} </Message>)}
                {verifyMessage && ( <Message> {verifyMessage} </Message>)}
              </MessageContainer>
              
              <InputFieldStyle>

                <EmailInputStyle
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={ (e) => setUserEmail(e.target.value)}
                  placeholder="이메일"/>
                
                <VerifyButton onClick={(e) => sendEmail(e)}>인증</VerifyButton>

              </InputFieldStyle>

              <InputFieldStyle>

                <EmailInputStyle
                  id="certification"
                  value={certification}
                  onChange={(e) => setCheckCertification(e.target.value)}
                  placeholder="인증번호 입력"/>

                  <VerifyButton onClick={(e) => verifyCertification(e)}>확인</VerifyButton>
              
              </InputFieldStyle>

              <InputFieldStyle>

                <LongInputField
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                />

              </InputFieldStyle>

              <InputFieldStyle>

                <ConfilmPasswordStyle
                  id="checkPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호 확인"
                  ref={confirmPasswordRef}
                />
              
              </InputFieldStyle>

              <ButtonContainer>
                <ButtonStyle animate={animateNextBtn} onClick={handleSubmit} herf="/choosePersonality">
                  다음
                </ButtonStyle>
              </ButtonContainer>

            </form>

          </ContainerStyle>

        </Background>
    )
};


export default CreateAccount;

