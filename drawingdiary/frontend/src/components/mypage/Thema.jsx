import styled, { css } from "styled-components";

const ThemaBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0 20px 15px 20px;
  box-sizing: border-box;
`;

const ThemaTextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ThemaText = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
`;

const ThemaSaveBtn = styled.button`
  display: flex;
  font-size: 20px;
  color: rgba(163, 163, 163);
  background-color: white;
  border: none;
  cursor: pointer;
`;

const ThemaColorBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid rgba(163, 163, 163, 0.7);
`;

const ThemaColor = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  ${(props) => `
    background: ${props.background};
  `}
`;

function Thema({ onColorChange }) {
  // body 배경색 변경 함수
  const handleColorChange = (color) => {
    onColorChange(color);
  };

  return (
    <ThemaBox>
      <ThemaTextBox>
        <ThemaText>Thema</ThemaText>
        <ThemaSaveBtn>저장</ThemaSaveBtn>
      </ThemaTextBox>

      <ThemaColorBox>
        <ThemaColor
          background="linear-gradient(45deg,rgb(106, 156, 253), rgb(174, 229, 255))"
          onClick={() => handleColorChange(1)}
        ></ThemaColor>
        <ThemaColor
          background="linear-gradient(45deg, rgb(255, 184, 208), rgba(106, 156, 253, 0.7))"
          onClick={() => handleColorChange(2)}
        ></ThemaColor>
        <ThemaColor
          background="linear-gradient(45deg, rgb(255, 227, 224), rgb(255, 186, 209))"
          onClick={() => handleColorChange(3)}
        ></ThemaColor>
        <ThemaColor
          background="linear-gradient(45deg,rgb(11, 58, 152),rgb(254, 229, 225))"
          onClick={() => handleColorChange(4)}
        ></ThemaColor>
        <ThemaColor
          background="linear-gradient(45deg,rgb(166, 220, 250),rgb(4, 52, 149))"
          onClick={() => handleColorChange(5)}
        ></ThemaColor>
      </ThemaColorBox>
    </ThemaBox>
  );
}

export default Thema;
