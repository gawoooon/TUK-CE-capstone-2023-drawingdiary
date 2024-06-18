import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import WeatherTypes from "./WeatherTypes";
import { MdOutlineThunderstorm } from "react-icons/md";
import { BsCloudDrizzle, BsClouds } from "react-icons/bs";
import { IoRainyOutline, IoSunnyOutline } from "react-icons/io5";
import { FaSnowman } from "react-icons/fa";
import { RiMistLine } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";

const WeatherContainer = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherContent = styled.div`
  display: flex;
  align-items: center;
`;

const DateText = styled.text`
  font-size: 16px;
  font-weight: bold;
`;

const LoadingImage = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 5px;
  margin-right: 20px;
`;

const Weather = ({ date, onWeatherStateChange }) => {
  const [weather, setWeather] = useState({ state: "" });
  const [loading, setLoading] = useState(true);

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

  // 날씨 상태 코드를 기반으로 날씨 상태 문자열을 반환하는 함수
  const getWeatherState = (weatherId) => {
    for (const [state, codes] of Object.entries(WeatherTypes)) {
      if (codes.includes(weatherId)) {
        return state;
      }
    }
    return "Unknown";
  };

  const getWeather = useCallback(
    async (lat, lon) => {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data = await response.json();

        const requestedDateUTC = new Date(
          date.currentYear,
          date.month - 1,
          date.day
        );

        // 가장 가까운 예보 찾기
        let closestForecast = data.list.reduce((acc, forecast) => {
          const forecastDate = new Date(forecast.dt * 1000); // UTC 기준 예보 날짜와 시간
          // 현재까지 찾은 가장 가까운 예보와의 차이 비교
          if (
            !acc ||
            Math.abs(forecastDate - requestedDateUTC) <
              Math.abs(acc.date - requestedDateUTC)
          ) {
            return { date: forecastDate, forecast };
          }
          return acc;
        }, null);

        if (closestForecast && closestForecast.forecast) {
          const weatherID = closestForecast.forecast.weather[0].id; // weather id 불러오기

          // weatherType 객체와 매핑
          const weatherState = getWeatherState(weatherID);

          setWeather({ state: weatherState });
          // onWeatherStateChange 함수를 통해 상위 컴포넌트로 날씨 상태 전달
          onWeatherStateChange(weatherState);
        } else {
          console.log("No forecast data found for the specified date and time");
        }
      } catch (error) {
        console.error("Error fetching weather forecast: ", error);
      } finally {
        setLoading(false);
      }
    },
    [date, onWeatherStateChange]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (date) {
          getWeather(position.coords.latitude, position.coords.longitude);
        }
      },
      (err) => {
        console.error("Geolocation error: ", err);
        setLoading(false);
      }
    );
  }, [date]);

  return (
    <WeatherContainer>
      <WeatherContent>
        {loading ? (
          <LoadingImage src="/Spinner.gif" alt="loading" />
        ) : (
          <>
            {weather.state === "thunderstorm" && (
              <MdOutlineThunderstorm
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {weather.state === "drizzle" && (
              <BsCloudDrizzle
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {weather.state === "showerrain" && (
              <IoRainyOutline
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {weather.state === "snow" && (
              <FaSnowman
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {weather.state === "mist" && (
              <RiMistLine
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {weather.state === "clearsky" && (
              <IoSunnyOutline
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {weather.state === "fewclouds" && (
              <TiWeatherPartlySunny
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
            {(weather.state === "clouds" ||
              weather.state === "scatteredclouds") && (
              <BsClouds
                size={24}
                color="3d3d3d"
                style={{ margin: "0 3px 3px 0" }}
              />
            )}
          </>
        )}
      </WeatherContent>
      <DateText>{date ? formatDate(date) : "날짜 정보 없음"}</DateText>
    </WeatherContainer>
  );
};

export default Weather;
