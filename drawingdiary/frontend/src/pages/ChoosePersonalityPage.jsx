import styled from "styled-components";
import Background from "../components/Background";
import ButtonForPersonality from "../components/button/ButtonForPersonality";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const ContainerStyle = styled.div`
  height: 450px;
  width: 550px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%; 
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #8C8C8C;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-top: 10px;
    margin-bottom: 10px;
    color: blue;
  }
  h5 {
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const MBTIContainer = styled.div`
    height: 50%;
    width: 95%;
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

const ChoosePersonality = () => {

    const [selected, setSelected] = useState(null);
    const [personality, setPersonality] = useState('');

    const location = useLocation();
    const userEmail = location.state?.email; // 이메일 값을 불러옴
    const userName = location.state?.name; // 이름 값을 불러옴
    

    console.log(userEmail);

    const mbtiKeywords = [
        "INTJ", "INTP", "ENTJ", "ENTP", 
        "INFJ", "INFP", "ENFJ", "ENFP", 
        "ISTJ", "ISFJ", "ESTJ", "ESFJ", 
        "ISTP", "ISFP", "ESTP", "ESFP"
    ];

    const navigate = useNavigate();

    
    const handleSelect = (keyword) => {
        if(selected === keyword) {
            setSelected(null);
        } else {
            setSelected(keyword);
            setPersonality(keyword);
        }
    };

    const handleSubmit = () => { 
        if(selected !== null) {
            // 백엔드 api로 데이터 전송
            axios.post('http://localhost:8080/api/updatePersonality', {
                email: userEmail,
                personality,
            })
            .then(response => {
                console.log('Success: ', response);
                navigate('/FinishPage')
            })
            .catch(error => {
                console.log('Error: ', error);
            });

        } else {
            alert('mbti를 선택해주세요!');
        }
    };
    
    return (
        <Background>

            <ContainerStyle>

                <h3>{userName}님의 mbti를 골라주세요!</h3>
                <h5>{userName}님이 고른 mbti는 어떤 그림체를 선호하는지 파악하는데 필요해요.</h5>

                <MBTIContainer>
                    {mbtiKeywords.map( (keyword) => (
                        <ButtonForPersonality 
                            key={keyword} 
                            keyword={keyword} 
                            onSelect={handleSelect}
                            selected={selected}
                            >
                            {keyword}
                        </ButtonForPersonality>
                    ))}

                </MBTIContainer>
                
                {/* <Button text="완료" onClick={handleSubmit}/> */}
                <ButtonContainer>
                    <ButtonStyle onClick={handleSubmit}>
                        다음
                    </ButtonStyle>
                </ButtonContainer>

            </ContainerStyle>

        </Background>
    );
};

export default ChoosePersonality;
