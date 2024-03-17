import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";
import Background from "../components/Background";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import AlbumCategory from "../components/album/AlbumCategory";
import GeneratedImage from "../components/edit diary/GeneratedImage";
import Sentiment from "../components/sentiment/Sentiment";
import ShowWeather from "../components/show/ShowWeather";
import ShowDiary from "../components/show/ShowDiary";
import ShowImageOption from "../components/show/ShowImageOption";
import ShowAIComment from "../components/show/ShowAIComment";
import ShowGeneratedImage from "../components/show/ShowGeneratedImage";

const FlexContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const RightContainer = styled.div`
  margin-left: 100px;
  padding-top: 50px;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 80px);
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

const CreateButtonStyle = styled.button`
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

function ShowDiaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { diaryData } = location.state || {};
  const { date } = location.state || {}; // 날짜 정보 수신

  // loading
  const [isRecommenderLoading, setIsRecommenderLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  // image
  const [newImageUrl, setNewImageUrl] = useState("");
  const [diaryText, setDiaryText] = useState(diaryData.diaryText);
  const [parentSelectedButtonStyle, setParentSelectedButtonStyle] =useState(false);

  // 날짜, 날씨
  const [weatherState, setWeatherState] = useState("Unknown");

  // 앨범
  const [selectedAlbumID, setSelectedAlbumID] = useState(null);

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  // message 부분
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);

  const [animateSaveBtn, setAnimateSaveBtn] = useState(false);
  const [animateCreateBtn, setAnimateCreateBtn] = useState(false);

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);
  const [sentimentResult, setSentimentResult] = useState('');

  const [newDiaryText, setNewDiaryText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [style, setStyle] = useState('');

  const [createBtn, setCreateBtn] = useState(false);

  const fetchDiary = () => {
    setWeatherState(diaryData.weather);
    setDiaryText(diaryData.diaryText);
    setNewImageUrl(diaryData.image);
    setStyle(diaryData.style);
    setCommentText(diaryData.comment);
    setPositiveValue(diaryData.sentiment.positive);
    setNegativeValue(diaryData.sentiment.negative);
    setNeutralValue(diaryData.sentiment.neutral);
  };

  // 앨범 상태를 업데이트하는 함수
  const handleSelectedAlbumChange = (onSelectAlbum) => {
    setSelectedAlbumID(onSelectAlbum);
  };

  // 페이지 로딩 시 초기 메시지를 5초간 표시
  useEffect(() => {
    setIsRecommenderLoading(true);
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

      // 소수점 두 자리까지 반올림하여 상태 업데이트 -- 어떤 값이 가장 큰지 비교해야 함
      setPositiveValue(Math.round(positive * 100) / 100);
      setNegativeValue(Math.round(negative * 100) / 100);
      setNeutralValue(Math.round(neutral * 100) / 100);

      const values = {
        positive: positiveValue,
        negative: negativeValue,
        neutral: neutralValue,
      };

      // 감정 분석 결과를 일기 내용에 반영시키는 부분
      const maxSentimentValue = Math.max(...Object.values(values));

      const maxSentimentName = Object.keys(values).find(
        (key) => values[key] === maxSentimentValue
      );

      setSentimentResult(maxSentimentName);

      if (maxSentimentName === "positive") {
        setNewDiaryText("따듯한 색감");
      } else if (sentimentResult === "negative") {
        setNewDiaryText("차가운 색감");
      } else if (sentimentResult === "neutral") {
        setNewDiaryText("베이지 색감");
      }
    } catch (error) {
      console.error("감정 분석 API 호출 중 오류 발생: ", error);
    }
  };

  const handleOptionSelect = (isSelected, selectedButtonStyle) => {
    setIsOptionSelected(isSelected);
    if (selectedButtonStyle === undefined && isSelected === true) {
    } else {
      setParentSelectedButtonStyle(selectedButtonStyle);
    }

    console.log(
      "다이어리 페이지에서 선택한 스타일:",
      parentSelectedButtonStyle,
      isSelected
    );
  };

  // Sentiment에 텍스트 전달
  const handleDiaryTextChange = (newText) => {
    console.log("여기는 show diary page");
    setIsTextValid(newText.length >= 30);
    setDiaryText(newText);
    console.log("바뀐 텍스트: ", newText);
    if (newText.length < 30) {
      setShowInitialMessage(true);
    } else {
      setShowInitialMessage(false);
    }
  };

  const isSaveButtonEnabled = isTextValid;

  useEffect(() => {
    if(createBtn) {
      analyzeSentiment();
    } else {
        fetchDiary();
    }
  }, [createBtn]);

  // 생성 버튼 클릭 핸들러
  const handleCreate = async () => {
    if (diaryText.length < 30) {
      setShowInitialMessage(true);
      setTimeout(() => {
        setShowInitialMessage(false);
      }, 5000);
      return;
    }
    
    setAnimateCreateBtn(true);
    setTimeout(() => {
      setAnimateCreateBtn(false);
    }, 500);
    
    setShowCreate(true);
    setTimeout(() => {
      setShowCreate(false);
    }, 5000);


    if (parentSelectedButtonStyle) {
      
      setCreateBtn(true);

      setIsImageLoading(true);
      setIsCommentLoading(true);
      //이미지 api
      try {
        const resultDiaryText = `${diaryText} ${parentSelectedButtonStyle} 그림체 ${newDiaryText}`;

        if(diaryText !== '') {
    
          const imageApiUrl = "http://127.0.0.1:5000/api/diary/image";
          const responseDiary = await fetch(imageApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resultDiaryText }),
          });
    
          if (responseDiary.ok) {
            const responseDate = await responseDiary.json();
    
            // url 받아오기
            const imageUrl = responseDate.image?.imageUrl;
            setIsImageLoading(false);
            setNewImageUrl(imageUrl);
          } else {
            console.error("이미지 저장 실패:", responseDiary.status);
    
            alert("이미지 저장에 실패하였습니다.");
          }

          const responseComment = await fetch("http://127.0.0.1:5000/api/diary/comment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ diaryText }),
          });

          if (responseComment.ok) {
            const comment = await responseComment.json();
            setIsCommentLoading(false);
            setCommentText(comment.comment);
          } else {
            console.error("코멘트 불러오기 실패: ", responseComment);
          }

        } else {
          alert("일기를 먼저 작성해주세요!");
        }

      } catch (error) {
        console.error("Error diary:", error);
        alert("일기 중에 오류가 발생하였습니다.");
      }
    } else {
      alert("이미지 스타일 먼저 생성해주세요!");
    }
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");

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

    // 날짜 데이터
    const formattedDate = new Date(date.currentYear, date.month - 1, date.day);

    // 날짜 및 월을 두 자릿수로 표시하는 함수
    const pad = (number) => (number < 10 ? `0${number}` : number);

    // "xxxx-xx-xx" 형식으로 날짜 문자열 생성
    const dateString = `${formattedDate.getFullYear()}-${pad(formattedDate.getMonth() + 1)}-${pad(formattedDate.getDate())}`;

    console.log("선택 날짜:", dateString);
    //image post
    if (newImageUrl) {

      console.log("album id: ", selectedAlbumID);

      // 일기 수정
      const responseDiary = await axios.put(
        `http://localhost:8080/api/diary/${dateString}`,
        {
          text: diaryText,
          weather: weatherState,
          date: dateString,
          albumID: selectedAlbumID,
          styleName: parentSelectedButtonStyle,
          imageFile: newImageUrl,
          confidence: {
            positive: positiveValue,
            negative: negativeValue,
            neutral: neutralValue,
          },
          comment: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (responseDiary.status === 200) {
        console.log("일기가 백엔드로 전송되었습니다.");
        alert("일기가 생성되었어요!");
        navigate("/calendar");
      } else {
        console.error("일기 전송 실패:", responseDiary.status);
      }
    } else {
      alert("이미지를 먼저 생성해주세요!");
    }
  };

  return (
    <div>
      <Background>
        <FlexContainer>
          <ShortSidebar />
          <RightContainer>
            <TopContent>
              <ShowWeather
                date={date}
                weatherIcon={weatherState}
              />
              <AlbumCategory onSelectAlbum={handleSelectedAlbumChange} />
            </TopContent>

            <MessageContainer>
              {showInitialMessage && (
                <MessageText color="#707070" show={!isTextValid}>
                  30자 이상 작성하세요!
                </MessageText>
              )}

              {showSuccess && (
                <MessageText color="#008000" show={isTextValid}>
                  일기가 성공적으로 수정되었습니다!
                </MessageText>
              )}

              {showCreate && (
                <MessageText color="#ff0000">
                  일기가 삭제되었습니다.
                </MessageText>
              )}
            </MessageContainer>

            <EditDiaryArea>
              <ShowDiary onDiaryTextChange={handleDiaryTextChange} showText={diaryText} />
              <ShowImageOption
                onOptionSelect={handleOptionSelect}
                isRecommenderLoading={isRecommenderLoading}
                selectedOption={style}
              />
            </EditDiaryArea>

            <div
              style={{
                marginLeft: "10px",
                marginRight: "20px",
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <ButtonContainer>
                <CreateButtonStyle 
                  onClick={handleCreate}
                  animate={animateCreateBtn}>
                  생성
                </CreateButtonStyle>
              </ButtonContainer>

              <ButtonContainer>
                <SaveButtonStyle
                  method="post"
                  type="button"
                  onClick={handleSave}
                  animate={animateSaveBtn}
                >
                  저장
                </SaveButtonStyle>
              </ButtonContainer>
            </div>

            <ManageAIArea>
              <ShowGeneratedImage isLoading={isImageLoading} newImageUrl={newImageUrl} />
              <RightComponentsContainer>
                <ShowAIComment text={commentText} isLoading={isCommentLoading} />
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

export default ShowDiaryPage;
