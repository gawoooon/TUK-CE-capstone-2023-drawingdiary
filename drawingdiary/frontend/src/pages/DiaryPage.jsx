import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlbumCategory from "../components/album/AlbumCategory";
import AIComment from "../components/diary/AIComment";
import EditDiary from "../components/diary/EditDiary";
import GeneratedImage from "../components/diary/GeneratedImage";
import ImageOption from "../components/diary/ImageOption";
import Sentiment from "../components/sentiment/Sentiment";
import Weather from "../components/weather/Weather";
import Background2 from "../components/Background/index2";
import NavBar from "../components/sidebar/NavBar";
import { IoIosSend } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { useAuth } from "../auth/context/AuthContext";
import { GrUploadOption } from "react-icons/gr";
import { IoMdRefresh } from "react-icons/io";

const Container = styled.body`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const DiaryContainer = styled.section`
  display: flex;
  width: 84%;
  flex-direction: column;
  padding: 1% 10% 2% 10%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8%;
`;

const MidContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 65%;
  padding: 1% 0 3% 0;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 27%;
`;

const LeftBox = styled.div`
  display: flex;
  width: 49%;
  height: 100%;
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 49%;
  height: 100%;
`;

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #b4cdfe;
  border-radius: 10px;
`;

const SentimentBox = styled.div`
  display: flex;
  width: 100%;
  height: 49%;
  background-color: #d2e2fe;
  border-radius: 10px;
`;

const CommentBox = styled.div`
  display: flex;
  width: 100%;
  height: 49%;
  background-color: #e1ebff;
  border-radius: 10px;
  padding: 1% 3%;
  box-sizing: border-box;
`;

const StyleBox = styled.div`
  display: flex;
  width: 500px;
  height: 29%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 69%;
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
`;

const BtnHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 50px;
  &:hover {
    background-color: #b7b7b7;
  }
`;

function DiaryPage() {
  const navigate = useNavigate();

  const { getToken } = useAuth();
  const accessToken = getToken();

  // loading
  const [isRecommenderLoading, setIsRecommenderLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  // image
  const [newImageUrl, setNewImageUrl] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const [parentSelectedButtonStyle, setParentSelectedButtonStyle] =
    useState(false);

  // 날짜, 날씨
  const location = useLocation();
  const { date } = location.state || {}; // 날짜 정보 수신
  const [weatherState, setWeatherState] = useState("Unknown");

  // 앨범
  const [selectedAlbumID, setSelectedAlbumID] = useState(null);

  const [isTextValid, setIsTextValid] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);

  const [commentText, setCommentText] = useState("");

  const [createBtn, setCreateBtn] = useState(false);

  // 날씨 상태를 업데이트하는 함수
  const handleWeatherStateChange = (newWeatherState) => {
    setWeatherState(newWeatherState);
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

      const { positive, negative, neutral } = response.data.document.confidence;

      setPositiveValue(Math.round(positive * 100) / 100);
      setNegativeValue(Math.round(negative * 100) / 100);
      setNeutralValue(Math.round(neutral * 100) / 100);

      const maxSentimentValue = response.data.document.sentiment;

      return maxSentimentValue;
    } catch (error) {
      console.error("감정 분석 API 호출 중 오류 발생: ", error);
    }
  };

  const handleOptionSelect = (isSelected, storedSelectedStyle) => {
    setIsOptionSelected(isSelected);
    if (storedSelectedStyle === undefined && isSelected === true) {
    } else {
      setParentSelectedButtonStyle(storedSelectedStyle);
    }
  };

  useEffect(() => {}, [parentSelectedButtonStyle]);

  // Sentiment에 텍스트 전달
  const handleDiaryTextChange = (newText) => {
    setIsTextValid(newText.length >= 30);
    setDiaryText(newText);
  };

  useEffect(() => {
    if (createBtn) {
      analyzeSentiment();
    }
  }, [createBtn, diaryText]);

  // 생성 버튼 클릭 핸들러
  const handleCreate = async () => {
    if (parentSelectedButtonStyle) {
      setCreateBtn(true);
      setIsImageLoading(true);
      setIsCommentLoading(true);

      try {
        // 감정 분석 결과를 받아오기
        const SentimentResult = await analyzeSentiment();

        const gender = localStorage.getItem("setGender");
        let userGender = "";

        if (gender === "M") {
          userGender = "Male";
        } else if (gender === "F") {
          userGender = "Female";
        } else {
          userGender = "none";
        }

        const resultDiaryText = `"${diaryText}", 이미지 스타일: ${parentSelectedButtonStyle},감정 : ${SentimentResult}, 주인공: ${userGender}`;

        console.log(resultDiaryText);
        if (diaryText !== "") {
          const imageApiUrl = "http://127.0.0.1:5000/api/diary/image";
          const responseDiary = await fetch(imageApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ resultDiaryText }),
          });
          console.log("dd");

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
    // 날짜 데이터
    const formattedDate = new Date(date.currentYear, date.month - 1, date.day);

    // 날짜 및 월을 두 자릿수로 표시하는 함수
    const pad = (number) => (number < 10 ? `0${number}` : number);

    // "xxxx-xx-xx" 형식으로 날짜 문자열 생성
    const dateString = `${formattedDate.getFullYear()}-${pad(
      formattedDate.getMonth() + 1
    )}-${pad(formattedDate.getDate())}`;

    const basicDiaryText = diaryText.split(", location:")[0];

    //image post
    if (newImageUrl) {
      console.log(
        basicDiaryText,
        weatherState,
        dateString,
        selectedAlbumID,
        parentSelectedButtonStyle,
        newImageUrl,
        commentText
      );
      const responseDiary = await axios.post(
        "http://localhost:8080/api/diary/add",
        {
          text: basicDiaryText,
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
        navigate("/");
      } else {
        console.error("일기 전송 실패:", responseDiary.status);
      }
    } else {
      alert("이미지를 먼저 생성해주세요!");
    }
  };

  return (
    <Container>
      <NavBar />
      <DiaryContainer>
        <TopContainer>
          <Weather
            date={date}
            onWeatherStateChange={handleWeatherStateChange}
          />
          <AlbumCategory onSelectAlbum={handleSelectedAlbumChange} />
        </TopContainer>
        <MidContainer>
          <LeftBox>
            <ImageBox>
              <GeneratedImage
                isLoading={isImageLoading}
                newImageUrl={newImageUrl}
              />
            </ImageBox>
          </LeftBox>
          <RightBox>
            <SentimentBox>
              <Sentiment
                positiveValue={positiveValue}
                negativeValue={negativeValue}
                neutralValue={neutralValue}
              />
            </SentimentBox>
            <CommentBox>
              <AIComment text={commentText} isLoading={isCommentLoading} />
            </CommentBox>
          </RightBox>
        </MidContainer>
        <BottomContainer>
          <StyleBox>
            <ImageOption
              onOptionSelect={handleOptionSelect}
              isRecommenderLoading={isRecommenderLoading}
            />
          </StyleBox>
          <TextBox>
            <EditDiary onDiaryTextChange={handleDiaryTextChange} />
            <BtnBox>
              <BtnHover onClick={handleCreate}>
                <IoMdRefresh size={16} />
              </BtnHover>

              <BtnHover onClick={handleSave}>
                <GrUploadOption size={16} />
              </BtnHover>
            </BtnBox>
          </TextBox>
        </BottomContainer>
      </DiaryContainer>
    </Container>
  );
}

export default DiaryPage;
