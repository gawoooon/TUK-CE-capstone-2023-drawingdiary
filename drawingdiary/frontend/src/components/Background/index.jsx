import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, p {
    margin: 0;
  }
  
  `;

const BackgroundColor = styled.body`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => getColor(props.backgroundColor)};
  width: 100%;
  height: 100vh;
  margin: auto;
`;

const BackgroundBox = styled.div`
  width: 1400px;
  height: 900px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
`;

const getColor = (color) => {
  switch (color) {
    case 1:
      return " linear-gradient(45deg, rgb(255, 184, 208), rgba(106, 156, 253, 0.7))";
    case 2:
      return "linear-gradient(45deg,rgb(106, 156, 253), rgb(174, 229, 255))";
    case 3:
      return "linear-gradient(45deg, rgb(255, 227, 224), rgb(255, 186, 209))";
    case 4:
      return "linear-gradient(45deg,rgb(11, 58, 152),rgb(254, 229, 225))";
    case 5:
      return "linear-gradient(45deg,rgb(166, 220, 250),rgb(4, 52, 149))";
    default:
      return "linear-gradient(45deg, rgb(255, 184, 208), rgba(106, 156, 253, 0.7))";
  }
};

function Background({ children, backgroundColor }) {
  const storedColor = parseInt(localStorage.getItem("selectedColor"));

  return (
    <>
      <GlobalStyle />
      <BackgroundColor
        backgroundColor={backgroundColor ? backgroundColor : storedColor}
      >
        <BackgroundBox>{children}</BackgroundBox>
      </BackgroundColor>
    </>
  );
}

export default Background;
