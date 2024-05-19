import React from "react";
import styled from "styled-components";

const TrueComponentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-left: 15px;
  padding: 30px 50px 10px 0;
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
  font-size: 22px;
  font-weight: 800;
  color: #090071;
`;

const EditBtn = styled.button`
  width: 65px;
  height: 34px;
  border: none;
  outline: none;
  background-color: white;
  font-size: 13px;
  color: black;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const RemoveBtn = styled.button`
  width: 65px;
  height: 34px;
  border: none;
  outline: none;
  background-color: white;
  font-size: 13px;
  color: black;
  cursor: pointer;
  border-radius: 15px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TrueComponentMidBox = styled.div`
  width: 100%;
  height: 50%;
  border: none;
  border-radius: 30px;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  margin-top: 20px;
`;

const BottomBox = styled.div`
  width: 95%;
  height: 30%;
  border: none;
  border-radius: 30px;
  padding: 8px;
  line-height: 1.3;
  margin-top: 40px;
`;

function TrueComponent({ isSelectedMonth, isSelectedDay, imageUrl, text, handleEdit, handleRemove }) {
  return (
    <TrueComponentBox>
      <TopBox>
        <RemoveBtn onClick={handleRemove}>삭제</RemoveBtn>
        <DateBox>
          {isSelectedMonth}월 {isSelectedDay}일
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
