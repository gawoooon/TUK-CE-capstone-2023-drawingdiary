import styled from "styled-components";

const BackgroundColor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f8e5eb, #dadff4);
  width: 100%;
  height: 100vh;
`;

const BackgroundBox = styled.div`
<<<<<<< Updated upstream
  width: 1000px;
=======
<<<<<<< HEAD
  width: 1800px;
=======
  width: 1000px;
>>>>>>> backendbranch
>>>>>>> Stashed changes
  height: 900px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 3px 3px 20px 5px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
`;

function Background() {
  return (
    <div>
      <BackgroundColor>
        <BackgroundBox></BackgroundBox>
      </BackgroundColor>
    </div>
  );
}

export default Background;
