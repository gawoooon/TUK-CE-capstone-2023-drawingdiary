import React, { useState } from "react";
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
import DeleteStyle from "../components/button/DeleteButton";

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
  const [diaryText, setDiaryText] = useState("");

  const handleDiaryTextChange = (text) => {
    setDiaryText(text);
  };

  const handleSaveDiary = async () => {
    try {
      if (diaryText === "") {
        console.log("일기 내용이 없어 저장되지 않았습니다.");
        return;
      }

      console.log("일기 내용 저장:", diaryText);

      // Flask 서버에 일기 내용을 전달
      const response = await fetch("/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diaryText }),
      });

      if (!response.ok) {
        console.error("Error saving diary!!!!:", response.statusText);
      } else {
        const result = await response.json();
        console.log("예아", result);
      }
    } catch (error) {
      console.error("Error saving diaryy:", error);
    }
  };

  return (
    <div>
      <Background>
        <FlexContainer>
          <ShortSidebar />
          <RightContainer>
            <TopContent>
              <Weather />
              <AlbumCategory />
            </TopContent>

            <EditDiaryArea>
              <EditDiary onDiaryTextChange={handleDiaryTextChange} />
              <ImageOption />
            </EditDiaryArea>

            <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <DeleteStyle text="삭제" />
              <Button text="저장" onClick={handleSaveDiary} />
            </div>

            <ManageAIArea>
              <GeneratedImage />
              <RightComponentsContainer>
                <AIComment />
                <Sentiment />
              </RightComponentsContainer>
            </ManageAIArea>
          </RightContainer>
        </FlexContainer>
      </Background>
    </div>
  );
}

export default DiaryPage;
