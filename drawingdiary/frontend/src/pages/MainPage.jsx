import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { isSameDay } from "date-fns";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Calendar2 from "../components/Calendar2";
import { useAuth } from "../auth/context/AuthContext";

import { GrFormPrevious } from "react-icons/gr";
import {
    CalendarProvider,
    useCalendar,
} from "../components/Calendar2/CalendarProvider";
import axios from "axios";
import Navbar from "../components/sidebar/NavBar";

const Body = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100%;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: calc(100% - 250px);
    height: 100%;
    position: relative;
    margin-top: 100px;
`;

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 650px; /* 이미지 컨테이너보다 약간 작도록 설정 */
    height: 650px;
    margin-right: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 650px;
    height: 650px;
    border-radius: 10px;
    overflow: hidden;
`;

const ImageBox = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;

const TopBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 650px;
    height: 50px;
    padding: 30px 30px 0 30px;
    z-index: 1;
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

function CalendarPage() {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateHasData, setSelectedDateHasData] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [text, setText] = useState("");

    const { memberID, getToken } = useAuth();
    const accessToken = getToken();

    const { year, setYear, month, setMonth } = useCalendar();
    const [data, setData] = useState([]);

    const [isSelectedYear, setIsSelectedYear] = useState("");
    const [isSelectedMonth, setIsSelectedMonth] = useState("");
    const [isSelectedDay, setIsSelectedDay] = useState("");

    const fetchUserName = useCallback(async () => {
        if (accessToken !== null) {
        try {
            const response = await axios.get("http://localhost:8080/api/get-member", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });

            localStorage.setItem("setName", response.data.name);
            localStorage.setItem("setEmail", response.data.email);
            localStorage.setItem("setBirth", response.data.birth);
            localStorage.setItem("setGender", response.data.gender);
            localStorage.setItem("selectedColor", response.data.theme);
            localStorage.setItem("setProfileImage", response.data.profileImage);
        } catch (error) {
            console.log("사용자의 이름을 불러오는 중 에러 발생: ", error);
        }
        }
    }, [memberID]);

    useEffect(() => {
        fetchUserName();
    }, [memberID, fetchUserName]);

    const handleDateClick = async (day) => {
        if (isSameDay(day, selectedDate)) {
        setSelectedDate(null);
        setSelectedDateHasData(false);
        } else {
        setSelectedDate(day); // selectedDate 상태 업데이트
        setSelectedDateHasData(true); // // selectedDate에 데이터가 존재하는지
        }
    };

    const handleEdit = async () => {
        const currentYear = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = new Date(currentYear, month - 1, day);

        // 날짜 및 월을 두 자릿수로 표시하는 함수
        const pad = (number) => (number < 10 ? `0${number}` : number);

        // "xxxx-xx-xx" 형식으로 날짜 문자열 생성
        const dateString = `${formattedDate.getFullYear()}-${pad(
        formattedDate.getMonth() + 1
        )}-${pad(formattedDate.getDate())}`;

        try {
        const response = await axios.get(
            `http://localhost:8080/api/diary/${dateString}`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            }
        );
        const dataArray = response.data;

        const diaryText = dataArray.text;
        const weather = dataArray.weather;
        const albumName = dataArray.albumName;
        const image = dataArray.imageURL;
        const comment = dataArray.comment;
        const style = dataArray.styleName;
        const sentiment = dataArray.sentiment;

        navigate(`/showDiary/${memberID}/${dateString}`, {
            state: {
            date: { currentYear, month, day },
            diaryData: {
                weather,
                albumName,
                diaryText,
                style,
                image,
                comment,
                sentiment,
            },
            },
        });
        } catch (error) {
        console.log("error: ", error);
        }
    };

    const handleRemove = async () => {
        try {
        await axios.delete(
            `http://localhost:8080/api/diary/${isSelectedYear}-${isSelectedMonth}-${isSelectedDay}`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            }
        );
        alert("일기가 정상적으로 삭제되었습니다!");
        window.location.replace("/");
        } catch (error) {
        console.log("error: ", error);
        }
    };

    const fetchCalendar = async () => {
        try {
        const response = await axios.get(
            `http://localhost:8080/api/calender/${year}-${month}`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            }
        );
        setData(response.data);
        } catch (error) {
        console.log("error: ", error);
        }
    };

    const fetchData = async (date) => {
        try {
        const index = data.findIndex((item) =>
            isSameDay(new Date(item.date), date)
        );

        if (index !== -1) {
            setText(data[index].text);
            setImageUrl(data[index].imageFile);
        }
        const hasData = index !== -1;
        return hasData;
        } catch (error) {
        console.error("Error fetching data:", error);
        return false;
        }
    };

    useEffect(() => {
        if (accessToken === null) {
        localStorage.clear();
        }
    }, [accessToken]);

    useEffect(() => {
        if (selectedDate) {
        setYear(format(selectedDate, "yyyy"));
        setMonth(format(selectedDate, "MM"));
        fetchCalendar();
        } else {
        fetchCalendar();
        }

        const fetchDataAndUpdateState = async () => {
        if (selectedDate) {
            setIsSelectedYear(format(selectedDate, "yyyy"));
            setIsSelectedMonth(format(selectedDate, "MM"));
            setIsSelectedDay(format(selectedDate, "dd"));

            try {
            const hasData = await fetchData(selectedDate);

            setSelectedDateHasData(hasData);
            } catch (error) {
            console.error("Error fetching data:", error);
            setSelectedDateHasData(false);
            }
        }
        };

        fetchDataAndUpdateState();
    }, [selectedDate]);

    return (
        <Body>
            <SidebarContainer>
                <Navbar />
            </SidebarContainer>
            <MainContent>
                <CalendarContainer>
                    <CalendarProvider>
                        <Calendar2 onDateClick={handleDateClick} />
                    </CalendarProvider>
                </CalendarContainer>
                {selectedDate && selectedDateHasData && (
                    <ImageContainer>
                        <TopBox>
                            <RemoveBtn onClick={handleRemove}>삭제</RemoveBtn>
                            <DateBox>
                                {isSelectedMonth}월 {isSelectedDay}일
                            </DateBox>
                            <EditBtn onClick={handleEdit}>수정</EditBtn>
                        </TopBox>
                        <ImageBox src={imageUrl} />
                    </ImageContainer>
                )}
            </MainContent>
        </Body>
    );
}

export default CalendarPage;
