import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import imageLoading from "../../animation/imageLodding.json";
import ImageStyleLists from "./ImageStyleLists";
import { useAuth } from "../../auth/context/AuthContext";
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  .slick-slider {
    width: 450px;
    box-sizing: border-box;
  }
  .slick-prev,
  .slick-next {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black; // 화살표 색상을 검정색으로 설정
    cursor: pointer;
    font-size: 24px;
  }
  .slick-slide {
    padding: 0 5px;
    box-sizing: border-box;
  }
`;

const SlideItem = styled.div`
  box-sizing: border-box;
  border: 1px solid #000000;
  text-align: center;
  font-size: 10px;
  cursor: pointer;
  border-radius: 20px;
  padding: 4px 0;
  background-color: ${({ isSelected }) => (isSelected ? "#ddd" : "#fff")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  &:hover {
    background-color: #ddd;
  }
`;

// const Container = styled.div`
//   width: 305px;
//   height: 400px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   h3 {
//     margin: 20px 0 0 10px;
//   }
// `;

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
  const [selectedIndex, setSelectedIndex] = useState(null); // hover
  const [currentPage, setCurrentPage] = useState(0); // 버튼 첫페이지
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
    setSelectedIndex(option); // hover
    console.log(option);
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <MdNavigateNext />,
    prevArrow: <MdNavigateBefore />,
    beforeChange: (_, next) => {
      const nextButton = document.querySelector(".slick-next");

      setCurrentPage(next);

      if (next === items.length - 5) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "flex";
      }
    },
  };

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    const prevButton = document.querySelector(".slick-prev");
    if (prevButton) {
      // 이전 버튼이 존재하는 경우에만 스타일을 변경합니다.
      prevButton.style.display = "none";
    }
  }, []); // 빈 배열을 전달하여 처음 렌더링 시에만 실행되도록 설정

  const items = [...recommendedStyles, ...otherStyles];

  return (
    <Container>
      {isLoading ? (
        <Lottie
          isClickToPauseDisabled={true}
          options={LoadingOptions}
          height={150}
          width={150}
        />
      ) : (
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index}>
              <SlideItem
                isSelected={selectedIndex === index}
                onClick={() => handleButtonStyleSelect(index)}
              >
                {item}
              </SlideItem>
            </div>
          ))}
        </Slider>
      )}
    </Container>
  );
};

export default ImageOption;
