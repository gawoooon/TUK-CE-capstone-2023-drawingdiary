import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
    width: 50px;
    height: 50px;
    margin-right: 5px;
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

const Weather = () => {
  const [weather, setWeather] = useState({
    icon: "",
  });
  const [coords, saveCoords] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleGeoSucc(position) {
    const { latitude, longitude } = position.coords;
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    console.error("geo error!", err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  async function getWeather(lat, lon) {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;

    const targetHour = 12;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&hour=${targetHour}&appid=${apiKey}`
      );
      const data = await response.json();

      const weatherIcon = data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      setWeather({
        icon: weatherIconAdrs,
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    } finally {
      setLoading(false);
    }
  }

  // 콘솔 오류 반복 때문에 내가 멋대로 수정한 거임
  useEffect(() => {
    if (!coords) {
      requestCoords();
    } else {
      getWeather(coords.latitude, coords.longitude);
    }
  }, [coords]);

  return (
    <WeatherContainer>
      <WeatherContent>
        {loading ? (
          <LoadingImage src="/icons8-loading.gif" alt="loading" />
        ) : (
          <WeatherImage src={weather.icon} alt="Weather Icon" />
        )}
      </WeatherContent>
      <DateText>1월 1일 월요일</DateText>
    </WeatherContainer>
  );
};

export default Weather;
