import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
import axiosInstance from "../axios/axisoInstance";
import { useAuth } from "../auth/context/AuthContext";

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

const ButtonContainer = styled.div`
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
  animation: ${(props) =>
    props.animate
      ? css`
          ${jumpAnimation} 0.5s ease
        `
      : "none"};
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
  animation: ${(props) =>
    props.animate
      ? css`
          ${jumpAnimation} 0.5s ease
        `
      : "none"};
`;

const MessageContainer = styled.div`
  margin: 30px 0 -30px 25px;
  min-height: 20px;
`;

const MessageText = styled.div`
  font-size: 15px;
  color: ${(props) => props.color || "#000"};
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  font-weight: bold;
`;

function DiaryPage() {
  // memberID를 가져오는 코드
  const { memberID } = useAuth();

  const [diaryText, setDiaryText] = useState("");

  const location = useLocation();
  const { date } = location.state || {}; // 날짜 정보 수신

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // message 부분
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  const [animateSaveBtn, setAnimateSaveBtn] = useState(false);
  const [animateDeleteBtn, setAnimateDeleteBtn] = useState(false);

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);

  useEffect(() => {
    // 페이지 로딩 시 초기 메시지를 5초간 표시
    const timer = setTimeout(() => {
      if (!isTextValid) {
        setShowInitialMessage(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isTextValid]);

  // 감정 분석 함수
  const analyzeSentiment = async () => {
    try {
      // 서버 프록시 엔드포인트로 요청 전송
      const response = await axios.post("/api/sentiment", {
        content: diaryText,
      });

      // 응답에서 감정분석 결과 추출
      const { positive, negative, neutral } = response.data.document.confidence;

      // 소수점 두 자리까지 반올림하여 상태 업데이트
      setPositiveValue(Math.round(positive * 100) / 100);
      setNegativeValue(Math.round(negative * 100) / 100);
      setNeutralValue(Math.round(neutral * 100) / 100);
    } catch (error) {
      console.error("감정 분석 API 호출 중 오류 발생: ", error);
    }
  };

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
  const handleSave = async () => {
    if (diaryText.length < 30) {
      setShowInitialMessage(true);
      setTimeout(() => {
        setShowInitialMessage(false);
        alert("30자 이상 적어주세요.");
      }, 5000);
      return;
    }

    if (isSaveButtonEnabled) {
      setAnimateSaveBtn(true);
      setTimeout(() => {
        setAnimateSaveBtn(false);
      }, 5000);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }

    // // // 감정 분석 실행
    // analyzeSentiment();

    try {
      console.log("일기 내용 저장:", diaryText);

      const imageApiUrl = "http://localhost:5000/api/diary/image";
      const response = await fetch(imageApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diaryText }),
      });

      console.log("bb");

      if (response.ok) {
        const responseDate = await response.json();

        console.log("일기:", responseDate);
        console.log("responseData type", typeof responseData);

        // 이미지 URL을 백엔드로 전송
        const imageUrl = responseDate.image?.imageUrl;
        console.log("이미지 url", imageUrl);

        if (imageUrl) {
          console.log("이미지가 있으먀ㅕㄴ ");
          const apiUrl = "http://localhost:8080/api/image/test/create";
          const responseImg = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: JSON.stringify({
              // 여기는 추가적으로 수정을 꼭 꼭 꼭 해야 한다!
              imageFile: imageUrl,
              diaryID: 1,
              dateID: 1,
              promptID: 1,
            }),
          })
            .then((responseImg) => {
              console.log("이미지 URL이 백엔드로 전송되었습니다.");
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        }

        // 성공 시 사용자에게 메시지를 표시하거나 다른 처리를 진행할 수 있습니다.
        alert("이미지가 성공적으로 저장되었습니다.");
      } else {
        console.error("이미지 저장 실패:", response.status);

        // 실패 시 사용자에게 에러 메시지를 표시하거나 다른 처리를 진행할 수 있습니다.
        alert("이미지 저장에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error saving diary:", error);

      // 에러 시 사용자에게 에러 메시지를 표시하거나 다른 처리를 진행할 수 있습니다.
      alert("일기 저장 중에 오류가 발생하였습니다.");
    }
  };

  // const apiUrl = "http://localhost:8080/api/diary/test/add";
  // const response = await fetch(apiUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     // 여기는 추가적으로 수정을 꼭 꼭 꼭 해야 한다!
  //     text: diaryText,
  //     weather: "날씨 맑음",
  //     dateID: "1",
  //     albumID: 1,
  //     memberID: memberID,
  //     styleID: 0,
  //   }),
  // });

  // if (response.ok) {
  //   const responseData = await response.json();
  //   console.log("하 십발발");
  //   console.log("일기:", responseData);
  //   console.log("responseData type", typeof responseData);

  //   // 이미지 URL을 백엔드로 전송
  //   const imageUrl = responseData.image?.imageUrl;
  //   console.log("이미지 url", imageUrl);
  //   if (imageUrl) {
  //     console.log("이미지가 있으먀ㅕㄴ ");
  //     axiosInstance
  //       .post("/api/image/test/create", {
  //         imageFile: imageUrl,
  //         diaryID: 1,
  //         dateID: "1",
  //         promptID: 1,
  //       })
  //       .then((response) => {
  //         console.log("이미지 URL이 백엔드로 전송되었습니다.");
  //       })
  //       .catch((error) => {
  //         console.log("Error: ", error);
  //       });
  //   }

  //   // 성공 시 사용자에게 메시지를 표시하거나 다른 처리를 진행할 수 있습니다.
  //   alert("일기가 성공적으로 저장되었습니다.");
  // } else {
  //   console.error("일기 저장 실패:", response.status);

  //   // 실패 시 사용자에게 에러 메시지를 표시하거나 다른 처리를 진행할 수 있습니다.
  //   alert("일기 저장에 실패하였습니다.");
  // }

  const handleDelete = () => {
    // 삭제 요청 들어가야함 -- 일기와 합치고 나서 추가적으로 해야 함
    setAnimateDeleteBtn(true);
    setTimeout(() => {
      setAnimateDeleteBtn(false);
    }, 500);

    setShowDelete(true);
    setTimeout(() => {
      setShowDelete(false);
    }, 5000);
  };

  return (
    <div>
      <Background>
        <FlexContainer>
          <ShortSidebar />
          <RightContainer>
            <TopContent>
              <Weather date={date} />
              <AlbumCategory />
            </TopContent>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></div>

            <MessageContainer>
              {showInitialMessage && (
                <MessageText color="#707070" show={!isTextValid}>
                  30자 이상 작성하세요!
                </MessageText>
              )}

              {showSuccess && (
                <MessageText color="#008000" show={isTextValid}>
                  일기가 성공적으로 생성되었습니다!
                </MessageText>
              )}

              {showDelete && (
                <MessageText color="#ff0000">
                  일기가 삭제되었습니다.
                </MessageText>
              )}
            </MessageContainer>

            <EditDiaryArea>
              <EditDiary onDiaryTextChange={handleDiaryTextChange} />
              <ImageOption onOptionSelect={handleOptionSelect} />
            </EditDiaryArea>

            <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ButtonContainer>
                <RemoveButtonStyle
                  onClick={handleDelete}
                  animate={animateDeleteBtn}
                >
                  삭제
                </RemoveButtonStyle>
              </ButtonContainer>

              <ButtonContainer>
                <SaveButtonStyle onClick={handleSave} animate={animateSaveBtn}>
                  저장
                </SaveButtonStyle>
              </ButtonContainer>
            </div>

            <ManageAIArea>
              <GeneratedImage />
              <RightComponentsContainer>
                <AIComment />
                <Sentiment
                  positiveValue={positiveValue}
                  negativeValue={negativeValue}
                  neutralValue={neutralValue}
                />
              </RightComponentsContainer>
            </ManageAIArea>
          </RightContainer>
        </FlexContainer>
      </Background>
    </div>
  );
}

export default DiaryPage;
