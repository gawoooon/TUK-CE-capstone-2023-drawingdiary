import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
import LongInputField from '../components/input field/LongInputField';
import ShortInputField from '../components/input field/ShortInputField';

const ContainerStyle = styled.div`
  height: 500px;
  width: 700px;
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
    margin-bottom: 20px;
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

const InputStyle = styled.input`
  height: 40px;
  width: 450px;
  padding-left: 10px;
  outline: none;
  font-size: 13px;
`;

const PhoneInputStyle = styled.input`
  height: 40px;
  width: 450px;
  padding-left: 10px;
  outline: none;
  font-size: 13px;
  margin-top: 20px;
`;

const SelectMonthContainer = styled.select`
  height: 45px;
  width: 175px;
  margin: 0px 15px 31px 15px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const SelectGenderContainer = styled.select`
  height: 45px;
  width: 585px;
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
  width: 570px;
  padding-left: 10px;
  outline: none;
  font-size: 13px;
`;

const VerifyButton = styled.button `
  height: 40px;
  width: 110px;
  margin-left: 10px;
  background-color: white;
  border: 2px solid rgba(106, 156, 253, 0.4);
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-size: 13px;
  text-align: center;
  outline: none;

  &:hover {
    background-color: rgba(106, 156, 253, 0.4);
    border: none;
    transition: 500ms;
  }
`;

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonStyle = styled.button`
    height: 45px;
    width: 400px;
    margin-bottom: 30px;
    background-color: rgba(106, 156, 253, 0.3);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    color: black;
    font-size: 18px;
    font-weight: bold;
    outline: none;
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
    const [errorMessage, setErrorMessage] = useState('');
    const [sendMessage, setSendMessage] = useState('');
    const [verifyMessage, setVerifyMessage] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [nextButton, setNextButton] = useState(false);

    const navigate = useNavigate();

    const confirmPasswordRef = useRef();

    // 다음 버튼을 누르면 수행할 함수
    const handleNextForm = (event) => {
      event.preventDefault();

      setNextButton(true);

      // if(!name || !year || !month || !day || !gender || !userPhone || !certificatePhoneNumber) {
      //   alert("모든 입력란을 채워주세요.");
      //   return;
      // } else {
      //   setNextButton(!nextButton);
      // }

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!userEmail || !certificateEmail || !password || !confirmPassword || !isEmailVerified) {
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
          await axios.post('http://localhost:8080/api/email/codesending', `${userEmail}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
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
      if(certificateEmail !== ''){
        try {
          await axios.post('http://localhost:8080/api/email/verify', {
            email: userEmail,
            verificationCode: certificateEmail
          });
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

            <form autoComplete="off">

              {nextButton ? (
                <section>
                  <div>
                    <MessageContainer>
                    {errorMessage && ( <Message> {errorMessage} </Message> )}
                    {sendMessage && ( <Message> {sendMessage} </Message>)}
                    {verifyMessage && ( <Message> {verifyMessage} </Message>)}
                    </MessageContainer>  
                  </div>

                  <div>
                    <InputFieldStyle>

                    <InputStyle
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={ (e) => setUserEmail(e.target.value)}
                      placeholder="이메일"/>

                    <VerifyButton onClick={(e) => sendEmail(e)}>인증</VerifyButton>

                    </InputFieldStyle>
                  </div>

                  <div>
                    <InputFieldStyle>

                    <InputStyle
                      id="certification"
                      value={certificateEmail}
                      onChange={(e) => checkCertificateEmail(e.target.value)}
                      placeholder="인증번호 입력"/>

                      <VerifyButton onClick={(e) => verifyCertification(e)}>확인</VerifyButton>

                    </InputFieldStyle>
                  </div>

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

                  <div style={{marginTop:'50px'}}>
                    <ButtonContainer>
                    <ButtonStyle onClick={handleSubmit} herf="/choosePersonality">
                      완료
                    </ButtonStyle>
                    </ButtonContainer>
                  </div>

                </section>
              ) : (
                <section>

                  <div style={{
                    marginBottom: '100px'
                  }}>
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
                  </div>

                    {/* -- 전화번호 입력 부분 -- */}

                    {/* <InputFieldStyle>
                    
                      <PhoneInputStyle 
                        id='phoneNumber'
                        type='phone'
                        value={userPhone}
                        onChange={ (e) => setUserPhone(e.target.value)}
                        placeholder='전화번호 입력'
                      />

                      <VerifyButton onClick={(e) => sendEmail(e)}>인증</VerifyButton>

                    </InputFieldStyle> */}

                    {/* <InputFieldStyle>

                    <InputStyle
                      id="certification"
                      value={certificateEmail}
                      onChange={(e) => checkCertificateEmail(e.target.value)}
                      placeholder="인증번호 입력"/>

                      <VerifyButton onClick={(e) => verifyCertification(e)}>확인</VerifyButton>

                    </InputFieldStyle> */} 

                  <div>
                    <ButtonContainer>
                      <ButtonStyle onClick={handleNextForm} herf="/choosePersonality">
                        다음
                      </ButtonStyle>
                    </ButtonContainer>
                  </div>
                </section>
              )}
            </form>

          </ContainerStyle>

        </Background>
    )
};


export default CreateAccount;

