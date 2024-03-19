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
  background: linear-gradient(45deg, rgb(255, 184, 208), rgba(106, 156, 253, 0.7));
  width: 100%;
  height: 100vh;
  margin: auto;
`;

const BackgroundBox = styled.div`
  width: 1700px;
  height: 900px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
`;

function Background2({ children }) {
  return (
    <>
      <GlobalStyle />
      <BackgroundColor>
        <BackgroundBox>{children}</BackgroundBox>
      </BackgroundColor>
    </>
  );
}

export default Background2;
