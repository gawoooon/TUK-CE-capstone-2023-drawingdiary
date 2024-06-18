import React, { useState, useRef } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import LongInputField from '../components/inputField/LongInputField';
import ShortInputField from '../components/inputField/ShortInputField';
import LoginBtn from '../components/LoginBtn';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 800;
  padding: 10px 0;
`;

const JoinBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 650px;
`;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  height: 500px;
`;

const MoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 48px;
  margin: 20px 0;
  background-color: rgba(106, 156, 253, 0.5);
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: rgba(106, 156, 253, 0.3);
  }
`;

const InputSection = styled.div`
  width: inherit;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InputStyle = styled.input`
  display: flex;
  width: 296px;
  height: 44px;
  margin: 5px 0;
  border: 0.0625rem solid rgb(237, 237, 237);
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  padding: 0 20px;
  &:focus {
    border-color: rgba(106, 156, 253, 0.5);
  }
`;

const PhoneInputStyle = styled.input`
  height: 40px;
  width: 450px;
  padding-left: 10px;
  outline: none;
  font-size: 13px;
  margin-top: 20px;
  &:focus {
    border-color: rgba(106, 156, 253, 0.5);
  }
`;

const SelectMonthContainer = styled.select`
  display: flex;
  width: 126px;
  height: 48px;
  margin: 6px;
  border: 0.0625rem solid rgb(237, 237, 237);
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  padding: 0 20px;
  &:focus {
    border-color: rgba(106, 156, 253, 0.5);
  }
`;

const SelectGenderContainer = styled.select`
  display: flex;
  width: 410px;
  height: 48px;
  margin: 6px;
  border: 0.0625rem solid rgb(237, 237, 237);
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  padding: 0 20px;
  &:focus {
    border-color: rgba(106, 156, 253, 0.5);
  }
`;

const BirthDayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ConfilmPasswordStyle = styled.input`
  display: flex;
  width: 368px;
  height: 44px;
  margin: 6px;
  border: 0.0625rem solid rgb(237, 237, 237);
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  padding: 0 20px;
  &:focus {
    border-color: rgba(106, 156, 253, 0.5);
  }
`;

const MessageContainer = styled.div`
  width: 400px;
  height: 14px;
`;

const Message = styled.div`
  font-size: 14px;
  color: red;
`;

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [certificateEmail, checkCertificateEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [certificatePhoneNumber, checkCertificatePhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const navigate = useNavigate();

    const confirmPasswordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!name || !year || !month || !day || !gender || !userEmail || !certificateEmail || !password || !confirmPassword || !isEmailVerified) {
          setMessage("모든 입력란을 채워주세요.");
          return;
        }

        // 비밀번호 일치 확인
        if(password !== confirmPassword) {
          setMessage("비밀번호가 일치하지 않습니다.");
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
        
        // 백엔드 api로 데이터 전송
        axios.post('http://localhost:8080/api/join', {
          name,
          email: userEmail,
          password,
          birth,
          gender: genderForm,
        })
        .then(response => {
          navigate('/FinishPage');
        })
        .catch(error => {
          if(error.response && error.response.status === 409) {
            setMessage(error.response.data.message); // 에러 메시지 상태 업데이트
          } else {
            console.log('Error: ', error);
          }
        });

    };

    const sendEmail = async (event) => {
      event.preventDefault();
      if(userEmail !== '') {
        try {
          await axios.post('http://localhost:8080/api/email/codesending', `${userEmail}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setMessage("이메일이 전송되었습니다.");
        } catch (error) {
          console.log("error: ", error);
        }
      } else {
        setMessage("이메일을 입력해주세요!");
      }
    };

    const verifyCertification = async (event) => {
      event.preventDefault();
      if(certificateEmail !== ''){
        try {
          await axios.post('http://localhost:8080/api/email/verify', {
            email: userEmail,
            verificationCode: certificateEmail
          });
          setIsEmailVerified(true);
          setMessage('이메일이 인증되었습니다.')
        } catch (error) {
          console.log("error: ", error);
        }
      }
    };
      
    return (
      <Body className='create-account-containers'>
        <JoinBox autoComplete="off">
          <Title>계정 만들기</Title>
          <InnerBox>
            <LongInputField
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />

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

            <InputSection>
              <InputStyle
                id="email"
                type="email"
                value={userEmail}
                onChange={ (e) => setUserEmail(e.target.value)}
                placeholder="이메일"/>
              <LoginBtn text="인증" onClick={(e) => sendEmail(e)} />
            </InputSection>

            <InputSection>
              <InputStyle
                id="certification"
                value={certificateEmail}
                onChange={(e) => checkCertificateEmail(e.target.value)}
                placeholder="인증번호 입력"/>
                <LoginBtn text="확인" onClick={(e) => verifyCertification(e)} />
            </InputSection>

            {message && (
              <MessageContainer>
                <Message>{message}</Message>
              </MessageContainer>
            )}

            <LongInputField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />

            <ConfilmPasswordStyle
              id="checkPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              ref={confirmPasswordRef}
            />

          </InnerBox>
          <MoveButton onClick={handleSubmit}>
            완료
          </MoveButton>
        </JoinBox>
      </Body>
    )
};

export default CreateAccount;
