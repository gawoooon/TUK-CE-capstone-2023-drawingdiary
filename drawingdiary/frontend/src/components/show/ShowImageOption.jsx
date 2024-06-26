import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import imageLoading from "../../animation/imageLodding.json";
import ImageStyleLists from "../diary/ImageStyleLists";
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
    height: 26px;
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
  border: 0.5px solid #000000;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  border-radius: 20px;
  padding: 4px 0;
  background-color: ${({ isSelected }) => (isSelected ? "#eeeeee" : "#fff")};
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  &:hover {
    background-color: #eeeeee;
  }
`;

const ShowImageOption = ({
  onOptionSelect,
  isRecommenderLoading,
  selectedOption,
  parentSelectedButtonStyle,
}) => {
  const LoadingOptions = {
    loop: true,
    autoplay: true,
    animationData: imageLoading,
  };

  const [selectedIndex, setSelectedIndex] = useState(null); // hover
  const [countDiary, setCountDiary] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 첫페이지

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
    console.log("option : ", option);
    setSelectedButtonStyle(option);
    setIsSelected(true);
    setStoredSelectedStyle(option);
    onOptionSelect(option);
    setSelectedIndex(option); // hover
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

  const items = [...recommendedStyles, ...otherStyles];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <MdNavigateNext />,
    prevArrow: <MdNavigateBefore />,
    beforeChange: (_, next) => {
      const prevButton = document.querySelector(".slick-prev");
      const nextButton = document.querySelector(".slick-next");

      setCurrentPage(next);

      if (next === 0) {
        prevButton.style.display = "none";
      } else {
        prevButton.style.display = "flex";
      }

      if (next >= items.length - 5) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "flex";
      }
    },
  };

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    const prevButton = document.querySelector(".slick-prev");
    const nextButton = document.querySelector(".slick-next");

    if (prevButton) {
      // 첫 페이지일 때 왼쪽 화살표 숨김
      prevButton.style.display = "none";
    }

    if (nextButton && items.length == 5) {
      // 아이템 수가 슬라이드에 보여지는 수 이하일 때 오른쪽 화살표 숨김
      nextButton.style.display = "none";
    }
  }, [items.length]);

  return (
    <Container>
      {isLoading ? (
        <Lottie
          isClickToPauseDisabled={true}
          options={LoadingOptions}
          height={100}
          width={100}
        />
      ) : (
        <Slider {...settings}>
          {items.map((item, index) => (
            <div key={index}>
              <SlideItem
                isSelected={
                  selectedIndex === null
                    ? parentSelectedButtonStyle === item
                    : selectedIndex === index
                }
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

export default ShowImageOption;
