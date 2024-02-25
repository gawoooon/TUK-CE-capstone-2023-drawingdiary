import React from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
  width: 760px;
  height: 760px;
  background-color: #fff;
  border-radius: 30px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px;
  }
`;

const GeneratedImage = ({ newImageUrl }) => {
  return (
    <div>
      <h3>생성된 이미지</h3>
      <ImageContainer>
        <img src={newImageUrl} alt="Generated" />
      </ImageContainer>
    </div>
  );
};

export default GeneratedImage;
