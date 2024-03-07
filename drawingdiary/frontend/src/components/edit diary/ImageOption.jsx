import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import imageLoading from "../../animation/imageLodding.json"
import ImageStyleLists from "./ImageStyleLists";

const OptionContainer = styled.div`
  width: 450px;
  height: 415px;
  margin: 10px 30px 10px 0;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin-bottom: 10px;
  }
`;

const SelectedStyle = styled.div`
  font-size: 13px;
  margin-top: 10px;
`;

const ButtonStyle = styled.button`
  width: 300px;
  height: 40px;
  margin-top: 15px;
  background-color: ${(props) => (props.isSelected ? "#ddd" : "rgba(255, 255, 255, 0.3)")};
  border: none;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const TextStyle = styled.text`
  font-size: 13px;
  color: #787878;
`;

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const ButtonImage = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
    max-height: 200px;
    width: 150px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
`;

const DropdownItem = styled.a`
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #ddd;
  }
`;

const ImageOption = ({ onOptionSelect, isRecommenderLoading }) => {
  const LoadingOptions = {
    loop:true,
    autoplay: true,
    animationData: imageLoading,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButtonStyle, setSelectedButtonStyle] = useState(null);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userGender, setUserGender] = useState("");

  const [imageList, setImageList] = useState([]);
  const [nonDuplicateStyles, setNonDuplicateStyles] = useState([]);

  const accessToken = localStorage.getItem('accessToken');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonStyleSelect = (option) => {
    setSelectedButtonStyle(option);
    setSelectedDropdownOption(null);
    setIsSelected(true);
  };

  const handleDropdownOptionSelect = (option) => {
    setSelectedDropdownOption(option);
    setSelectedButtonStyle(null);
    setIsOpen(false);
    setIsSelected(true);
  };

  const fetchOptionStyle = async () => {
    const response = await axios.get("http://localhost:8080/api/get-member", {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const birthYear = parseInt(response.data.birth.split("-")[0]);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    const genderCodes = { "S": "secret", "F": "female", "M": "male"};
    const gender = genderCodes[response.data.gender] || "Unknown";

    setUserAge(age);
    setUserGender(gender);
    setUserName(response.data.name);
    
    const apiUrl = "http://127.0.0.1:5001/api/get-styles"

    try {
      const styleResponse = await fetch(apiUrl, {
        method: "POST", 
        headers: {  
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: age,
          gender: gender
         })
      });
      
      if (styleResponse.ok) {
        const styleData = await styleResponse.json();
        setIsLoading(!isRecommenderLoading);
        setImageList(styleData.predicted_styles);
      } 
      else {
        console.log("스타일을 불러오는 중 에러가 발생했습니다.");
      }
    } catch (error) {
      console.log("스타일을 불러오는 중 에러 발생: ", error);
    }
  };

  useEffect(() => {
    fetchOptionStyle();
  }, []);

  useEffect(() => {
    onOptionSelect(isSelected);

    const filterNonDuplicateStyles = ImageStyleLists.filter(style => !imageList.includes(style));
    setNonDuplicateStyles(filterNonDuplicateStyles);
  }, [isSelected, onOptionSelect, imageList]);

  return (
      <OptionContainer>
        <h3>추천하는 이미지 스타일</h3>
        <SelectedStyle>
          선택한 스타일: {selectedButtonStyle !== null ? selectedButtonStyle : selectedDropdownOption !== null ? selectedDropdownOption : "없음"}
        </SelectedStyle>
        {isLoading ? (
          <Lottie isClickToPauseDisabled={true} options={LoadingOptions} height={280} width={280} />
        ) : (
          imageList.map((style, index) => (
            <ButtonStyle key={index} isSelected={selectedButtonStyle === style} onClick={() => handleButtonStyleSelect(style)}>
              {style}
            </ButtonStyle>
          ))
        )}

        <div>
          <TextStyle>
            {userName}님의 성격을 고려해 선별한 리스트입니다.<br></br>마음에 드시는 옵션이 없으면 더보기를 눌러주세요.
          </TextStyle>

          <DropdownContainer>
            <ButtonImage onClick={toggleDropdown} src="/three-dots.png" alt="plus button" />
            <DropdownContent isOpen={isOpen}>
              {nonDuplicateStyles.map((style, index) => (
                <DropdownItem key={index} onClick={() => handleDropdownOptionSelect(style)}>
                  {style}
                </DropdownItem>
              ))}
            </DropdownContent>
          </DropdownContainer>
        </div>
      </OptionContainer>
  );
};

export default ImageOption;
