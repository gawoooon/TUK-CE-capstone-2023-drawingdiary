import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const WeatherContainer = styled.div`
  width: 287px;
  height: 50px;
  border: none;
  border-radius: 40px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: cen;
  align-items: center;
`;

const WeatherContent = styled.div`
  display: flex;
  align-items: center;
`;

const WeatherImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const DateText = styled.text`
  font-size: 23px;
  font-weight: bold;
`;

const Weather = () => {
    
    const [weatherData, setWeather] = useState({
        icon: "",
    });
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherData(lat, lon);
        });
    }, []);
    
    // 위치 기반 날씨 정보 조회
    const getWeatherData = async (lat, lon) => {
        const API_KEY = process.env.REACT_APP_WEATHER_KEY;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`
            );

            const weatherIcon = response.data.weather[0].icon;
            const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            setWeather({
                icon: weatherIconAdrs,
            });

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <WeatherContainer>
            <WeatherContent>
                <WeatherImage
                src={`${weatherData.icon}.png`}
                alt="Weather Icon"
                />
            </WeatherContent>
            <DateText>1월 1일 월요일</DateText>
        </WeatherContainer>
    );
};

export default Weather;
