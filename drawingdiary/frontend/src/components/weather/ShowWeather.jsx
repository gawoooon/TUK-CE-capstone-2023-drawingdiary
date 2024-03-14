import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import WeatherTypes from "./WeatherTypes";

const WeatherContainer = styled.div`
  width: 287px;
  height: 60px;
  border: none;
  border-radius: 40px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherContent = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  margin-top: 3px;
`;

const DateText = styled.text`
  font-size: 23px;
  font-weight: bold;
`;

const LoadingImage = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-right: 20px;
`;

const ShowWeather = ({ date, weatherIcon }) => {
    console.log("weatherIcon: ", weatherIcon);

  const formatDate = (date) => {
    const newDate = new Date(date.currentYear, date.month - 1, date.day);
    const days = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    const dayOfWeek = days[newDate.getDay()];
    return `${months[newDate.getMonth()]} ${newDate.getDate()}일 ${dayOfWeek}`;
  };

  return (
    <WeatherContainer>
      <WeatherContent>
          <WeatherImage src={`/weather/${weatherIcon}.png`} alt="Weather Icon" />
      </WeatherContent>
      <DateText>{date ? formatDate(date) : "날짜 정보 없음"}</DateText>
    </WeatherContainer>
  );
};

export default ShowWeather;
