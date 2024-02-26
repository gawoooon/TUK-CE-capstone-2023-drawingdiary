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

const Weather = ({ date }) => {
    const [weather, setWeather] = useState({ icon: "" });
    const [loading, setLoading] = useState(true);

    const formatDate = (date) => {
        const newDate = new Date(date.year, date.month - 1, date.day);
        const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        const dayOfWeek = days[newDate.getDay()];
        return `${months[newDate.getMonth()]} ${newDate.getDate()}일 ${dayOfWeek}`;
    };

    // 날씨 상태 코드를 기반으로 날씨 상태 문자열을 반환하는 함수
    const getWeatherState = (weatherId) => {
        for(const [state, codes] of Object.entries(WeatherTypes)) {
            if (codes.includes(weatherId)) {
                return state;
            }
        }
        return "Unknown";
    };


    const getWeather = useCallback(async (lat, lon) => {
        const apiKey = process.env.REACT_APP_WEATHER_KEY;
        let weatherIconSrc = "";
        
        // 추가할 것 :
        /*
        1. 만약 diary 데이터베이스에 새로 추가되는 데이터 값들이라면
            날씨를 새로 생성하고 나서 날씨 description이나, weatherID를 저장하도록 해야함
            2. 만약 이미 존재하는 diary를 조회할 때에는 날씨를 새로 생성하지 않도록 추가적인 작업이 필요함. 
            3. 예보를 찾는 과정에서 이러한 로직이 추가될 필요가 있음.
            => getWeather함수와 useEffect 부분 수정 필요함.
            */
        try {
           const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const data = await response.json();

            const requestedDateUTC = new Date(date.year, date.month - 1, date.day);

            // 가장 가까운 예보 찾기
            let closestForecast = data.list.reduce((acc, forecast) => {
                const forecastDate = new Date(forecast.dt * 1000); // UTC 기준 예보 날짜와 시간
                // 현재까지 찾은 가장 가까운 예보와의 차이 비교
                if (!acc || Math.abs(forecastDate - requestedDateUTC) < Math.abs(acc.date - requestedDateUTC)) {
                    return { date: forecastDate, forecast };
                }
                return acc;
            }, null);
            
            if (closestForecast && closestForecast.forecast) {
                const weatherID = closestForecast.forecast.weather[0].id; // weather id 불러오기

                // weatherType 객체와 매핑
                const weatherState = getWeatherState(weatherID);
                weatherIconSrc = `/weather/${weatherState}.png`;

                setWeather({ icon: weatherIconSrc });
            } else {
                console.log("No forecast data found for the specified date and time");
            }
        } catch (error) {
            console.error("Error fetching weather forecast: ", error);
        } finally {
        setLoading(false);
        }
    }, [date]);
    
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
    }, [date, getWeather]);

    return (
        <WeatherContainer>
        <WeatherContent>
            {loading ? (
            <LoadingImage src="/icons8-loading.gif" alt="loading" />
            ) : (
            <WeatherImage src={weather.icon} alt="Weather Icon" />
            )}
        </WeatherContent>
        <DateText>{date ? formatDate(date) : "날짜 정보 없음"}</DateText>
        </WeatherContainer>
    );
};

export default Weather;