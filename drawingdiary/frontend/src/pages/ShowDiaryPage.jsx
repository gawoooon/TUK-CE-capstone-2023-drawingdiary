import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import NavBar from "../components/sidebar/NavBar";
import AlbumCategory from "../components/album/AlbumCategory";
import Sentiment from "../components/sentiment/Sentiment";
import ShowWeather from "../components/show/ShowWeather";
import ShowDiary from "../components/show/ShowDiary";
import ShowImageOption from "../components/show/ShowImageOption";
import ShowAIComment from "../components/show/ShowAIComment";
import ShowGeneratedImage from "../components/show/ShowGeneratedImage";
import Background2 from "../components/Background/index2";
import { IoIosSend } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

const Container = styled.body`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const DiaryContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const RightContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RightTopContent = styled.div`
  height: 50px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightMidContent = styled.div`
  height: 81%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-bottom: 10px;
`;

const RightBottomContent = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
`;

const LeftContainer = styled.section`
  width: 50%;
  height: 100%;
`;

const LeftTopContent = styled.div`
  height: 30px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const LeftMidContent = styled.div`
  height: 82%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
`;

const LeftBottomContent = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
  margin: 0 10px;
`;

const SaveBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  background-color: white;
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
  const [parentSelectedButtonStyle, setParentSelectedButtonStyle] =useState(true);

  // 날짜, 날씨
  const [weatherState, setWeatherState] = useState("Unknown");

  // 앨범
  const [selectedAlbumID, setSelectedAlbumID] = useState(null);

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);

  const [newDiaryText, setNewDiaryText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [style, setStyle] = useState("");

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

      const maxSentimentValue = response.data.document.sentiment;

      console.log(maxSentimentValue);

      if (maxSentimentValue === "positive") {
        return "따듯한 색감";
      } else if (maxSentimentValue === "negative") {
        return "차가운 색감";
      } else if (maxSentimentValue === "neutral") {
        return "베이지 색감";
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
    setIsTextValid(newText.length >= 30);
    setDiaryText(newText);
  };

  useEffect(() => {
    if (createBtn) {
      analyzeSentiment();
    } else {
      fetchDiary();
    }
  }, [createBtn]);

  // 생성 버튼 클릭 핸들러
  const handleCreate = async () => {

    if (parentSelectedButtonStyle) {
      setCreateBtn(true);

      setIsImageLoading(true);
      setIsCommentLoading(true);
      //이미지 api
      try {
        const resultDiaryText = `${diaryText} ${parentSelectedButtonStyle} 그림체 ${newDiaryText}`;

        if (diaryText !== "") {
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

          const responseComment = await fetch(
            "http://127.0.0.1:5000/api/diary/comment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ diaryText }),
            }
          );

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

    // 날짜 데이터
    const formattedDate = new Date(date.currentYear, date.month - 1, date.day);

    // 날짜 및 월을 두 자릿수로 표시하는 함수
    const pad = (number) => (number < 10 ? `0${number}` : number);

    // "xxxx-xx-xx" 형식으로 날짜 문자열 생성
    const dateString = `${formattedDate.getFullYear()}-${pad(
      formattedDate.getMonth() + 1
    )}-${pad(formattedDate.getDate())}`;

    //image post
    if (newImageUrl) {
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
      <Background2>
        <Container>
          <DiaryContainer>
            <RightContainer>
              <RightTopContent>
                <ShowWeather date={date} weatherIcon={weatherState} />
                <AlbumCategory onSelectAlbum={handleSelectedAlbumChange} />
              </RightTopContent>
              <RightMidContent>
                <ShowImageOption
                  onOptionSelect={handleOptionSelect}
                  isRecommenderLoading={isRecommenderLoading}
                  selectedOption={style}
                />
                <LeftBottomContent>
                  <ShowAIComment
                    text={commentText}
                    isLoading={isCommentLoading}
                  />
                  <Sentiment
                    positiveValue={positiveValue}
                    negativeValue={negativeValue}
                    neutralValue={neutralValue}
                  />
                </LeftBottomContent>
              </RightMidContent>
              <RightBottomContent>
                <ShowDiary
                  onDiaryTextChange={handleDiaryTextChange}
                  showText={diaryText}
                />
                <IoIosSend size={28} color="rgba(106, 156, 253, 0.8)" onClick={handleCreate} style={{cursor: 'pointer', marginLeft: '20px'}} />
              </RightBottomContent>
            </RightContainer>
            <LeftContainer>
              <NavBar />
              <LeftTopContent>
                <SaveBtn onClick={handleSave}>
                  저장하기
                  <FaRegCheckCircle size={18} color="#3d3d3d" style={{marginLeft: '10px'}} />
                </SaveBtn>
              </LeftTopContent>
              <LeftMidContent>
                <ShowGeneratedImage
                  isLoading={isImageLoading}
                  newImageUrl={newImageUrl}
                />
              </LeftMidContent>
            </LeftContainer>
          </DiaryContainer>
        </Container>
      </Background2>
    </div>
  );
}

export default ShowDiaryPage;
