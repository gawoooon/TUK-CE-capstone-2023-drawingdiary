import styled from "styled-components";
import Background from "../components/Background";
import ButtonForPersonality from "../components/button/ButtonForPersonality";
import Button from "../components/button/Button";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

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
  border: 1px solid #8C8C8C;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin-top: 10px;
    margin-bottom: 3px;
  }
  h5 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const ScrollableContainer = styled.div`
    height: 100%;
    overflow-y: auto;
    width: 95%;
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
`;

const ChoosePersonality = () => {

    const [selectCount, setSelectedCount] = useState(0);
    const [selectPersonality, setSelectPersonality] = useState("");

    const personalityKeywords = [
        "창의적", "분석적", "사교적", "내성적", "실용적",
        "이상주의적", "자유분방", "질서정연", "모험적", "보수적",
        "감성적", "논리적", "낙천적", "비관적", "전통적",
        "혁신적", "친절함", "경쟁적", "협조적", "독립적",
        "정서적 안정", "정서적 민감", "상상력", "실증적", "예술적",
        "실험적", "직관적", "체계적", "감각적", "합리적",
        "호기심 많음", "목적 지향적", "유머 감각", "타협적", "낭만적",
        "영적", "도전적", "유연성", "규율 있는", "카리스마적",
        "예리함", "통찰력 있는", "공감적", "동정심 많음", "희생적",
        "인내심", "활기참", "평온함", "핵심을 파악하는", "사려 깊음",
        "심오함", "실험적 마인드", "반성적", "민감함", "결단력",
        "강직함", "융통성", "예술적 감각", "상세 지향적", "객관적",
        "환경 의식적", "진취적", "비판적 사고", "정직함", "자비로움",
        "인내심 있는", "추진력", "개방성", "자기 인식", "책임감 있는"
    ];

    const navigate = useNavigate();

    
    const handleSelect = (keyword) => {
        // 선택된 버튼 갯수 증가
        setSelectedCount(prevCount => prevCount + 1);
        setSelectPersonality(prev => prev ? `${prev}, ${keyword}` : keyword); 
    };
    
    const handleDeselect = (keyword) => {
        // 선택된 버튼 갯수 감소
        setSelectedCount(prevCount => prevCount - 1);
        setSelectPersonality(prev => 
            prev.split(', ')
                .filter(k => k !== keyword)
                .join(', ')
        );
    };
    
    const handleSubmit = () => { 
        if(selectCount >= 5) {
            navigate('/FinishPage');
        } else {
            alert('5가지 이상 선택해주세요!');
        }
        console.log(selectPersonality);
    };
    
    return (
        <Background>

            <ContainerStyle>

                <h3>OO님의 성격을 골라주세요!</h3>
                <h5>OO님이 고른 성격은 어떤 그림체를 선호하는지 파악하는데 필요해요.</h5>
                <h4>5가지 이상 선택해주세요!</h4>

                <ScrollableContainer>

                    {personalityKeywords.map( (keyword) => (
                        <ButtonForPersonality key={keyword} keyword={keyword} onSelect={handleSelect} onDeselect={handleDeselect}>
                            {keyword}
                        </ButtonForPersonality>
                    ))}

                </ScrollableContainer>
                
                <Button text="완료" onClick={handleSubmit}/>

            </ContainerStyle>

        </Background>
    );
};

export default ChoosePersonality;