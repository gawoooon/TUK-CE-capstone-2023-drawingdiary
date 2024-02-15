import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import Background from "../components/Background";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import AlbumCategory from "../components/album/AlbumCategory";
import EditDiary from "../components/edit diary/EditDiary";
import Weather from "../components/weather/Weather";
import ImageOption from "../components/edit diary/ImageOption";
import GeneratedImage from "../components/edit diary/GeneratedImage";
import AIComment from "../components/edit diary/AIComment";
import Sentiment from "../components/sentiment/Sentiment";

const FlexContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const RightContainer = styled.div`
  margin-left: 100px;
  padding-top: 40px;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 70px);
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const TopContent = styled.div`
  height: 50px;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  & > * {
    margin-bottom: 30px;
  }
`;

const EditDiaryArea = styled.div`
  width: 100%;
  height: 500px;
  margin: 30px 20px 0px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  `;

const ManageAIArea = styled.div`
  width: 100%;
  height: 811px;
  margin: 30px 20px 0px 10px;
  display: flex;
  justify-content: space-between;
`;

const RightComponentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

const RemoveButtonStyle = styled.button`
    height: 50px;
    width: 250px;
    margin-bottom: 30px;
    background-color: rgba(255, 184, 208, 0.5);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-weight: bold;
    animation: ${(props) => props.animate ? css`${jumpAnimation} 0.5s ease` : 'none'};
`;


const SaveButtonStyle = styled.button`
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
  animation: ${(props) => props.animate ? css`${jumpAnimation} 0.5s ease` : 'none'};
`;

const MessageContainer = styled.div`
  margin: 30px 0 -30px 25px;
  min-height: 20px;
`;

const MessageText = styled.div`
    font-size: 15px;
    color: ${(props) => props.color || '#000'};
    transition: opacity 0.5s ease-in-out;
    opacity: ${(props) => (props.show ? 1 : 0)};
    font-weight: bold;
`;



function DiaryPage() {

  const location = useLocation();
  const { date } = location.state || {}; // 날짜 정보 수신

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const [diaryText, setDiaryText] = useState('');

  // message 부분
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  const [animateSaveButton, setAnimateSaveButton] = useState(false);

  useEffect(() => {
    // 페이지 로딩 시 초기 메시지를 5초간 표시
    const timer = setTimeout(() => {
      if(!isTextValid) {
        setShowInitialMessage(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isTextValid]);

  // EditDiary에서 텍스트 길이 조건 충족 여부 받기
  // const handleTextChange = (isValid) => {
  //   setIsTextValid(isValid);
  // };
  
  // ImageOption에서 옵션 선택 여부 받기
  const handleOptionSelect = (isSelected) => {
    setIsOptionSelected(isSelected);
  };
  
  // Sentiment에 텍스트 전달
  const handleDiaryTextChange = (newText) => {
    setIsTextValid(newText.length >= 30);
    setDiaryText(newText);
    if (newText.length > 0) {
      setShowInitialMessage(false);
    }
  };

  
  // 저장 버튼 활성화 조건
  // const isSaveButtonEnabled = isTextValid && isOptionSelected;
  // 일단 임시로 이걸로 하자
  const isSaveButtonEnabled = isTextValid;

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    if(isSaveButtonEnabled) {
      setAnimateSaveButton(true);
      setTimeout(() => {
        setAnimateSaveButton(false);
      }, 500);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };
  
  const handleDelete = () => {
    
  };

  return (
    <div>
      <Background>
        <FlexContainer>
        <ShortSidebar/>
        <RightContainer>
          <TopContent>
            {/* 날짜 정보 전달 */}
            <Weather date={date}/>
            <AlbumCategory/>
          </TopContent>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          </div>


          <MessageContainer>
            {showInitialMessage && (
              <MessageText color="#ff0000" show={!isTextValid}>30자 이상 작성하세요!</MessageText>
            )}

            {showSuccess && (
              <MessageText color="#008000" show={isTextValid}>일기가 성공적으로 생성되었습니다!</MessageText>
            )}
          </MessageContainer>

          <EditDiaryArea>
            <EditDiary onDiaryTextChange={handleDiaryTextChange}/>
            <ImageOption onOptionSelect={handleOptionSelect}/>
          </EditDiaryArea>

          <div style={{marginLeft: '20px', marginRight: '20px', display: 'flex', justifyContent: 'space-between'}}>

            <ButtonContainer>
                <RemoveButtonStyle onClick={handleDelete}>
                    삭제
                </RemoveButtonStyle>
            </ButtonContainer>
            
            <ButtonContainer>
                <SaveButtonStyle onClick={handleSave} disabled={!isSaveButtonEnabled} animate={animateSaveButton}>
                    저장
                </SaveButtonStyle>
            </ButtonContainer>
          </div>
          
          <ManageAIArea>
            <GeneratedImage/>
            <RightComponentsContainer>
              <AIComment/>
              <Sentiment text={diaryText}/>
            </RightComponentsContainer>

          </ManageAIArea>


        </RightContainer>

        </FlexContainer>
      </Background>
    </div>
  );
}

export default DiaryPage;
