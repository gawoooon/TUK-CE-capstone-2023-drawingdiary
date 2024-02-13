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
  background: linear-gradient(45deg, rgba(255, 184, 208, 0.58), rgba(106, 156, 253, 0.4));
  width: 100%;
  height: 100vh;
  margin: auto;
`;

const BackgroundBox = styled.div`
<<<<<<< HEAD
  width: 1800px;
=======
  width: 1400px;
>>>>>>> main
  height: 900px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
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
