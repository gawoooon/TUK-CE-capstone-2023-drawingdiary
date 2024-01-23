import React, { useState } from "react";
import styled from "styled-components";

const OptionContainer = styled.div`
  width: 450px;
  height: 410px;
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
    width: auto;
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

const ImageOption = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButtonStyle, setSelectedButtonStyle] = useState(null);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonStyleSelect = (option) => {
    setSelectedButtonStyle(option);
    setSelectedDropdownOption(null);
  };

  const handleDropdownOptionSelect = (option) => {
    setSelectedDropdownOption(option);
    setSelectedButtonStyle(null);
    setIsOpen(false);
  };

  return (
    <div>
      <OptionContainer>
        <h3>추천하는 이미지 스타일</h3>
        <SelectedStyle>
          선택한 스타일: {selectedButtonStyle !== null ? selectedButtonStyle : selectedDropdownOption !== null ? selectedDropdownOption : "없음"}
        </SelectedStyle>
        {Array.from({ length: 5 }, (_, index) => (
          <ButtonStyle key={index} isSelected={selectedButtonStyle === index + 1} onClick={() => handleButtonStyleSelect(index + 1)}>
            {index + 1}
          </ButtonStyle>
        ))}

        <div>
          <TextStyle>
            님의 성격을 고려해 선별한 리스트입니다.<br></br>마음에 드시는 옵션이 없으면 더보기를 눌러주세요.
          </TextStyle>

          <DropdownContainer>
            <ButtonImage onClick={toggleDropdown} src="/three-dots.png" alt="plus button" />
            <DropdownContent isOpen={isOpen}>
              {Array.from({ length: 20 }, (_, index) => (
                <DropdownItem key={index} onClick={() => handleDropdownOptionSelect(index + 6)}>
                  {index + 6}
                </DropdownItem>
              ))}
            </DropdownContent>
          </DropdownContainer>
        </div>
      </OptionContainer>
    </div>
  );
};

export default ImageOption;
