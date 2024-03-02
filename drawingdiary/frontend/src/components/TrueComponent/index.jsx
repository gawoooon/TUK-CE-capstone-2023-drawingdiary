import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../auth/context/AuthContext";
import { useState } from "react";
import axios from "axios";

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 30px 30px 30px 0px;
  box-sizing: border-box;
  transition: width 0.5s linear;
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
`;

const MiddleBox = styled.div`
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
`;

const BottomBox = styled.div`
  width: 95%;
  height: 30%;
  border: none;
  border-radius: 30px;
  padding: 8px;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: lightgray;
`;

function TrueComponent({ year, month, day, selectedDate, image: imageUrl, text }) {
  const navigate = useNavigate();
  const { memberID } = useAuth();
  const accessToken = localStorage.getItem('accessToken');

  const handleEdit = () => {
    // 로그인 로직을 처리한 후 '/calendar' 페이지로 이동
    const formattedDate = format(selectedDate, "yyyyMMdd");
    console.log(selectedDate);
    navigate(`/diary/${memberID}/${formattedDate}`, {
      state: { date: { year, month, day } },
    });
  };

  const handleRemove = async () => {
    const year = format(selectedDate, "yyyy");
    const month = format(selectedDate, "MM");
    const day = format(selectedDate, "dd");

    console.log("year: ", year, ", month: ", month, ", day: ", day);

    try {
      const response = await axios.delete(`http://localhost:8080/api/diary/${year}-${month}-${day}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  };

  return (
    <ResultBox>
      <TopBox>
        <RemoveBtn onClick={handleRemove}>삭제</RemoveBtn>
        <DateBox>
          {month}월{day}일
        </DateBox>
        <EditBtn onClick={handleEdit}>편집</EditBtn>
      </TopBox>
      <MiddleBox><ImageBox src={imageUrl}/></MiddleBox>
      <Divider />
      <BottomBox>{text}</BottomBox>
    </ResultBox>
  );
}

export default TrueComponent;
