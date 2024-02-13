import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Background from "../components/Background";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import AlbumCategory from "../components/album/AlbumCategory";
import EditDiary from "../components/edit diary/EditDiary";
import Weather from "../components/weather/Weather";
import ImageOption from "../components/edit diary/ImageOption";
import GeneratedImage from "../components/edit diary/GeneratedImage";
import Button from "../components/button/Button";
import AIComment from "../components/edit diary/AIComment";
import Sentiment from "../components/sentiment/Sentiment";
import { RemoveButton } from "../components/button/DeleteButton";

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

function DiaryPage() {

  const location = useLocation();
  const { date } = location.state || {}; // 날짜 정보 수신

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // EditDiary에서 텍스트 길이 조건 충족 여부 받기
  const handleTextChange = (isValid) => {
    setIsTextValid(isValid);
  };

  // ImageOption에서 옵션 선택 여부 받기
  const handleOptionSelect = (isSelected) => {
    setIsOptionSelected(isSelected);
  };

  // 저장 버튼 활성화 조건
  const isSaveButtonEnabled = isTextValid && isOptionSelected;

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

          <EditDiaryArea>
            <EditDiary onTextChange={handleTextChange}/>
            <ImageOption onOptionSelect={handleOptionSelect}/>
          </EditDiaryArea>

          <div style={{marginLeft: '20px', marginRight: '20px', display: 'flex', justifyContent: 'space-between'}}>
            <RemoveButton text="삭제"/>
            <Button text="저장" disabled={!isSaveButtonEnabled}/>
          </div>
          
          <ManageAIArea>
            <GeneratedImage/>
            <RightComponentsContainer>
              <AIComment/>
              <Sentiment/>
            </RightComponentsContainer>

          </ManageAIArea>


        </RightContainer>

        </FlexContainer>
      </Background>
    </div>
  );
}

export default DiaryPage;
