import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, p {
    margin: 0;
  }
  
  `;

const BackgroundColor = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f8e5eb, #dadff4);
  width: 100%;
  height: 100vh;
`;

const BackgroundBox = styled.div`
  width: 1400px;
  height: 900px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
`;

function Background({ children }) {
  return (
    <>
      <GlobalStyle />
      <BackgroundColor>
        <BackgroundBox>{children}</BackgroundBox>
      </BackgroundColor>
    </>
  );
}

export default Background;
