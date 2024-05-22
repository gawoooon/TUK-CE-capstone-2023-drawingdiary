import React from "react";
import styled from "styled-components";

const TrueComponentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-left: 15px;
  padding: 10px;
  box-sizing: border-box;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5%;
`;

const DateBox = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #0d0d0d;
`;

const EditBtn = styled.button`
  width: 65px;
  height: 34px;
  border: none;
  outline: none;
  background-color: white;
  font-size: 13px;
  color: #0d0d0d;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: rgba(106, 156, 253, 0.2);
  }
`;

const RemoveBtn = styled.button`
  width: 65px;
  height: 34px;
  border: none;
  outline: none;
  background-color: white;
  font-size: 13px;
  color: #0d0d0d;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: rgba(106, 156, 253, 0.2);
  }
`;

const TrueComponentMidBox = styled.div`
  width: 100%;
  height: 85%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 20px;
`;

const BottomBox = styled.div`
  width: 95%;
  height: 15%;
  border: none;
  padding: 8px;
  margin-top: 20px;
`;

function TrueComponent({ month, day, imageUrl, text, handleEdit, handleRemove }) {
  return (
    <TrueComponentBox>
      <TopBox>
        <RemoveBtn onClick={handleRemove}>삭제</RemoveBtn>
        <DateBox>
          {month}월 {day}일
        </DateBox>
        <EditBtn onClick={handleEdit}>수정</EditBtn>
      </TopBox>
      <TrueComponentMidBox>
        <ImageBox src={imageUrl} />
      </TrueComponentMidBox>
      <BottomBox>{text}</BottomBox>
    </TrueComponentBox>
  );
}

export default TrueComponent;
