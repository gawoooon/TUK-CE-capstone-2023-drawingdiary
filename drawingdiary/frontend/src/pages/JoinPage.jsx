import React, { useState, useRef } from 'react';
import styled from "styled-components";
import axiosInstance from '../axios/axisoInstance';
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
import LongInputField from '../components/input field/LongInputField';
import ShortInputField from '../components/input field/ShortInputField';
import SmallButton from "../components/button/SmallButton";

const ContainerStyle = styled.div`
  height: 700px;
  width: 550px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%; 
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin-top: 10px;
    margin-bottom: 10px;
  };
`;

const InputFieldStyle = styled.div`
  margin: 0px 15px 30px 15px;
`;

const EmailInputStyle = styled.input`
  height: 40px;
  width: 350px;
  padding-left: 10px;
  border: 1px solid #909090;
  border-radius: 10px;
`;

const SelectMonthContainer = styled.select`
  height: 45px;
  width: 125px;
  margin: 0px 15px 30px 15px;
  padding-left: 5px;
  border: 1px solid #909090;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectGenderContainer = styled.select`
  height: 45px;
  width: 435px;
  margin: 0px 15px 30px 15px;
  padding-left: 5px;
  border: 1px solid #909090;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BirthDayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfilmPasswordStyle = styled.input`
  height: 40px;
  width: 420px;
  padding-left: 10px;
  border: 1px solid #909090;
  border-radius: 10px;
`;

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonStyle = styled.button`
    height: 50px;
    width: 250px;
    margin-bottom: 30px;
    background-color: rgba(106, 156, 253, 0.3);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [certification, setCheckCertification] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const confirmPasswordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!name || !year || !month || !day || !gender || !email || !certification || !password || !confirmPassword) {
          alert("모든 입력란을 채워주세요.");
          return;
        }

        // 비밀번호 일치 확인
        if(password !== confirmPassword) {
          alert("비밀번호가 일치하지 않습니다.");
          confirmPasswordRef.current.focus();
          return;
        }
        // 데이터 전송이 성공하면 지워야 함
        // navigate('/choosePersonality');

        // 생일 형식 설정 부분
        const birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        console.log('Sending data:', { name, email, password, birth, gender });


        
        // 백엔드 api로 데이터 전송
        axiosInstance.post('/api/join', {
          name,
          email,
          password,
          birth,
          gender,
        })
        .then(response => {
          console.log('Success: ', response);
          navigate('/choosePersonality');
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    };

    return (
        <Background>

          <ContainerStyle className='create-account-containers'>

            <h3>계정 만들기</h3>

            <form onSubmit={handleSubmit}>

              <InputFieldStyle>

                <LongInputField
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeHolder="이름"
                />

              </InputFieldStyle>

              <BirthDayContainer>

                <ShortInputField
                  id="year"
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeHolder="연"
                />

                <SelectMonthContainer 
                  name='month'
                  id='month'
                  onChange={ (e) => setMonth(e.target.value)}>
                  <option value={""} disabled style={{ color: 'grey'}}>월</option>
                  <option value={"1"}>1월</option>
                  <option value={"2"}>2월</option>
                  <option value={"3"}>3월</option>
                  <option value={"4"}>4월</option>
                  <option value={"5"}>5월</option>
                  <option value={"6"}>6월</option>
                  <option value={"7"}>7월</option>
                  <option value={"8"}>8월</option>
                  <option value={"9"}>9월</option>
                  <option value={"10"}>10월</option>
                  <option value={"11"}>11월</option>
                  <option value={"12"}>12월</option>

                </SelectMonthContainer>

                <ShortInputField
                  id="day"
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeHolder="일"
                />

              </BirthDayContainer>

              <SelectGenderContainer
                name='gender'
                id='gender'
                onChange={ (e) => setGender(e.target.value)}>
                <option value="" disabled style={{ color: 'grey'}}>성별</option>
                <option value="female">여자</option>
                <option value="male">남자</option>
                <option value="secret">공개안함</option>
              </SelectGenderContainer>

              <InputFieldStyle>

                <EmailInputStyle
                  id="email"
                  type="email"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value)}
                  placeholder="이메일"/>
                
                <SmallButton text="인증"/>
              
              </InputFieldStyle>

              <InputFieldStyle>

                <EmailInputStyle
                  id="certification"
                  type="email"
                  value={certification}
                  onChange={(e) => setCheckCertification(e.target.value)}
                  placeHolder="인증번호 입력"/>

                  <SmallButton text="확인"/>
              
              </InputFieldStyle>

              <InputFieldStyle>

                <LongInputField
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeHolder="비밀번호"
                />

              </InputFieldStyle>

              <InputFieldStyle>

                <ConfilmPasswordStyle
                  id="checkPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeHolder="비밀번호 확인"
                  ref={confirmPasswordRef}
                />
              
              </InputFieldStyle>

              <ButtonContainer>
                <ButtonStyle type="submit" onClick={handleSubmit} herf="/choosePersonality">
                  다음
                </ButtonStyle>
              </ButtonContainer>

            </form>

          </ContainerStyle>

        </Background>
    )
};


export default CreateAccount;

