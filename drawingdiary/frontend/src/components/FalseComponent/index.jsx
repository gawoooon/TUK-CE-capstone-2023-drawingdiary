import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";
import { format } from "date-fns";

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: opacity 200ms ease-out;
`;

const TopBox = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #090071;
  display: flex;
  transition: opacity 200ms ease-out;
`;

const MiddleBox = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #090071;
  padding: 10px 0px;
  box-sizing: border-box;
  transition: opacity 200ms ease-out;
`;

const AddBtn = styled.button`
  width: 120px;
  height: 50px;
  border: none;
  outline: none;
  background-color: #090071;
  font-size: 20px;
  font-weight: 400;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  margin-top: 20px;
`;

function FalseComponent({ currentYear, month, day, selectedDate }) {
  const navigate = useNavigate();
  const { memberID } = useAuth();

  const handleAdd = () => {
    const formattedDate = format(selectedDate, "yyyyMMdd");
    navigate(`/diary/${memberID}/${formattedDate}`, {
      state: { date: { currentYear, month, day } },
    });
  };

  return (
    <ResultBox>
      <TopBox>
        {month}월 {day}일
      </TopBox>
      <MiddleBox>일기를 작성하세요.</MiddleBox>
      <AddBtn onClick={handleAdd}>추가하기</AddBtn>
    </ResultBox>
  );
}

export default FalseComponent;
