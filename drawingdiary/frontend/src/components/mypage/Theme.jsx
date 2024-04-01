import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ThemeBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0 20px 15px 20px;
  box-sizing: border-box;
`;

const ThemeTextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ThemeText = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
`;

const ThemeSaveBtn = styled.button`
  display: flex;
  font-size: 20px;
  color: rgba(163, 163, 163);
  background-color: white;
  border: none;
  cursor: pointer;
`;

const ThemeColorBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid rgba(163, 163, 163, 0.7);
`;

const ThemeColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  ${(props) => `
    background: ${props.background};
  `}
`;

function Theme({ onColorChange }) {
  const [selectedNumber, setSelectedNumber] = useState(
    localStorage.getItem("selectedColor")
  );

  // body 배경색 변경 함수
  const handleColorChange = (color) => {
    onColorChange(color);
    setSelectedNumber(color);
    console.log(selectedNumber);
  };

  // 저장 버튼 클릭 시
  const handleSaveButtonClick = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (selectedNumber !== null) {
      try {
        const responseTheme = await axios.put(
          "/api/theme",
          {
            theme: selectedNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (responseTheme.status === 200) {
          localStorage.setItem("selectedColor", selectedNumber);
          console.log("테마가 업데이트되었습니다.");
          alert("테마가 업데이트되었습니다!");
        } else {
          console.error(
            "테마 업데이트 중 오류 발생:",
            responseTheme.statusText
          );
          alert("테마 업데이트 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("테마 업데이트 중 오류 발생:", error);
        alert("테마 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      console.error("선택된 숫자가 없습니다.");
      alert("선택된 숫자가 없습니다.");
    }
  };

  return (
    <ThemeBox>
      <ThemeTextBox>
        <ThemeText>Theme</ThemeText>
        <ThemeSaveBtn onClick={handleSaveButtonClick}>저장</ThemeSaveBtn>
      </ThemeTextBox>

      <ThemeColorBox>
        <ThemeColor
          background="linear-gradient(45deg, rgb(255, 184, 208), rgba(106, 156, 253, 0.7)) "
          onClick={() => handleColorChange(1)}
        ></ThemeColor>
        <ThemeColor
          background="linear-gradient(45deg,rgb(106, 156, 253), rgb(174, 229, 255))"
          onClick={() => handleColorChange(2)}
        ></ThemeColor>
        <ThemeColor
          background="linear-gradient(45deg, rgb(255, 227, 224), rgb(255, 186, 209))"
          onClick={() => handleColorChange(3)}
        ></ThemeColor>
        <ThemeColor
          background="linear-gradient(45deg,rgb(11, 58, 152),rgb(254, 229, 225))"
          onClick={() => handleColorChange(4)}
        ></ThemeColor>
        <ThemeColor
          background="linear-gradient(45deg,rgb(166, 220, 250),rgb(4, 52, 149))"
          onClick={() => handleColorChange(5)}
        ></ThemeColor>
      </ThemeColorBox>
    </ThemeBox>
  );
}

export default Theme;
