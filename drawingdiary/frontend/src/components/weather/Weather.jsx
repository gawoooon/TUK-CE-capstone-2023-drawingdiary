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

    async function getWeather(lat, lon, date) {
        const apiKey = process.env.REACT_APP_WEATHER_KEY;

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const data = await response.json();

            const requestedDateUTC = date;

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
                const weatherIcon = closestForecast.forecast.weather[0].icon;
                console.log(weatherIcon);
                const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                setWeather({ icon: weatherIconUrl });
            } else {
                console.log("No forecast data found for the specified date and time");
            }
        } catch (error) {
        console.error("Error fetching weather forecast: ", error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            if (date) {
                const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}T15:00:00Z`;
                const requestedDate = new Date(formattedDate);
                getWeather(position.coords.latitude, position.coords.longitude, requestedDate);
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