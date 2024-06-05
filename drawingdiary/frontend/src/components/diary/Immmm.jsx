import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import imageLoading from "../../animation/imageLodding.json";
import ImageStyleLists from "./ImageStyleLists";
import { useAuth } from "../../auth/context/AuthContext";

const Container = styled.div`
  width: 305px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin: 20px 0 0 10px;
  }
`;

const TopContainer = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 16px;
`;

const Description = styled.div`
  width: 90%;
  margin-bottom: 10px;
`;

const OptionContainer = styled.div`
  width: 95%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const LeftContainer = styled.div`
  height: 250px;
  margin-top: 10px;
  display: ${({ display }) => display};
  flex-direction: column;
  transition: opacity 0.5s ease-in-out;
`;

const RightContainer = styled.div`
  height: 250px;
  margin-top: 10px;
  margin-left: 6px;
  display: ${({ display }) => display};
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  transition: opacity 0.5s ease-in-out;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const SelectedStyle = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const OptionBtnStyle = styled.button`
  width: 200px;
  min-height: 36px;
  margin: 5px 0;
  background-color: ${(props) =>
    props.isSelected ? "#ddd" : "rgba(255, 255, 255, 0.3)"};
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const TextStyle = styled.div`
  padding-top: 2px;
  font-size: 12px;
  color: black;
`;

const OpenBtn = styled.button`
  width: 65px;
  height: 30px;
  margin: 10px;
  border: none;
  outline: none;
  font-size: 13px;
  color: black;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ImageOption = ({ onOptionSelect, isRecommenderLoading }) => {
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: imageLoading,
  };

  const [countDiary, setCountDiary] = useState(0);

  const [displayLeft, setDisplayLeft] = useState("flex"); // 초기 상태는 'flex'
  const [displayRight, setDisplayRight] = useState("none"); // 초기 상태는 'none'
  const [openBtn, setOpenBtn] = useState("더보기");

  const [selectedButtonStyle, setSelectedButtonStyle] = useState(null);
  const [storedSelectedStyle, setStoredSelectedStyle] = useState(null);

  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userGender, setUserGender] = useState("");

  const [recommendedStyles, setRecommendedStyles] = useState([]);
  const [otherStyles, setOtherStyles] = useState([]);

  const { getToken } = useAuth();
  const accessToken = getToken();

  // '더보기'/'닫기' 버튼 클릭 핸들러
  const handleOpen = () => {
    if (displayLeft === "flex") {
      setDisplayLeft("none");
      setDisplayRight("flex");
      setOpenBtn("닫기");
    } else {
      setDisplayLeft("flex");
      setDisplayRight("none");
      setOpenBtn("더보기");
    }
  };

  const handleButtonStyleSelect = (option) => {
    setSelectedButtonStyle(option);
    setIsSelected(true);
    setStoredSelectedStyle(option);
    onOptionSelect(true, option);
  };

  useEffect(() => {
    if (selectedButtonStyle !== null) {
      setStoredSelectedStyle(selectedButtonStyle);
    }
  }, [selectedButtonStyle]);

  const CountDiary = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/statistic", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCountDiary(response.data.lawn.total);
    } catch (error) {
      console.log("error");
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/get-member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const birthYear = parseInt(response.data.birth.split("-")[0]);
      const currentYear = new Date().getFullYear();

      setUserAge(currentYear - birthYear);

      const genderChar = response.data.gender;

      setUserGender(genderChar);
      setUserName(response.data.name);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchOptionStyle = async () => {
    try {
      const fallbackResponse = await axios.post(
        "http://localhost:8080/api/style",
        {
          age: userAge,
          gender: userGender,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoading(!isRecommenderLoading);
      const updateRecommendedStyles =
        fallbackResponse.data.predicted_styles.map((styleName) => {
          return ImageStyleLists.find(
            (style) => style.trim() === styleName.trim()
          );
        });
      setRecommendedStyles(updateRecommendedStyles);
    } catch (error) {
      const styleResponse = await axios.get(
        "http://localhost:8080/api/test/style",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoading(!isRecommenderLoading);
      const updateRecommendedStyles = styleResponse.data.predicted_styles.map(
        (styleName) => {
          return ImageStyleLists.find(
            (style) => style.trim() === styleName.trim()
          );
        }
      );
      setRecommendedStyles(updateRecommendedStyles);
    }
  };

  useEffect(() => {
    CountDiary();
    if (userAge !== 0 || userGender !== "") {
      fetchOptionStyle();
    } else {
      fetchUserInfo();
    }
  }, [userAge, userGender, countDiary]);

  useEffect(() => {
    onOptionSelect(isSelected);

    const filterNonDuplicateStyles = ImageStyleLists.filter(
      (style) => !recommendedStyles.map((rStyle) => rStyle).includes(style)
    );
    setOtherStyles(filterNonDuplicateStyles);
  }, [isSelected, onOptionSelect, recommendedStyles]);

  return (
    <Container>
      <TopContainer>
        <h4>스타일 선택</h4>
        <OpenBtn onClick={handleOpen}>{openBtn}</OpenBtn>
      </TopContainer>
      <Description>
        {countDiary < 5 ? (
          <TextStyle>
            아래 스타일은 {userName}님과 나이와 성별이 같은 사용자들이 가장 많이
            선택한 5가지의 스타일 입니다. 스타일을 추천받고 싶다면 일기를 5번
            이상 작성하세요.
          </TextStyle>
        ) : (
          <TextStyle>
            {userName}님과 비슷한 사용자들이 선택한 스타일입니다. 마음에 드시는
            옵션이 없으면 더보기를 눌러주세요.
          </TextStyle>
        )}
      </Description>
      <OptionContainer>
        <SelectedStyle>
          선택한 스타일:{" "}
          {storedSelectedStyle !== null ? storedSelectedStyle : "없음"}
        </SelectedStyle>
        <LeftContainer display={displayLeft}>
          {isLoading ? (
            <Lottie
              isClickToPauseDisabled={true}
              options={LoadingOptions}
              height={150}
              width={150}
            />
          ) : (
            recommendedStyles.map((style, index) => (
              <OptionBtnStyle
                key={index}
                isSelected={selectedButtonStyle === style}
                onClick={() => handleButtonStyleSelect(style)}
              >
                {`${style}`}
              </OptionBtnStyle>
            ))
          )}
        </LeftContainer>
        <RightContainer display={displayRight}>
          {otherStyles.map((style, index) => (
            <OptionBtnStyle
              key={index}
              isSelected={selectedButtonStyle === style}
              onClick={() => handleButtonStyleSelect(style)}
            >
              {`${style}`}
            </OptionBtnStyle>
          ))}
        </RightContainer>
      </OptionContainer>
    </Container>
  );
};

export default ImageOption;
