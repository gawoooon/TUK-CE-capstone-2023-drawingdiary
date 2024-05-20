import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { isSameDay } from "date-fns";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Calendar2 from "../components/Calendar2";
import { useAuth } from "../auth/context/AuthContext";
import { RxImage } from "react-icons/rx";
import {
    CalendarProvider,
    useCalendar,
} from "../components/Calendar2/CalendarProvider";
import axios from "axios";
import Navbar from "../components/sidebar/NavBar";

const fadeOut = keyframes`
from {
    opacity: 1;
    transform: translateX(0px);
}
to {
    opacity: 1;
    transform: translateX(710px);
}
`;

const fadeIn = keyframes`
from {
    opacity: 1;
    transform: translateX(710px);
}
to {
    opacity: 1;
    transform: translateX(0px);
}
`;

const calendarFadeOut = keyframes`
from {
    opacity: 1;
    transform: translateX(0px);
}
to {
    opacity: 1;
    transform: translateX(-710px);
}
`;

const calendarFadeIn = keyframes`
from {
    opacity: 1;
    transform: translateX(-710px);
}
to {
    opacity: 1;
    transform: translateX(0px);
}
`;

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
    width: 710px;
    height: 710px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    z-index: 2;
    ${({ isMovingOut }) =>
        isMovingOut &&
        css`
            animation: ${calendarFadeOut} 0.3s forwards;
        `}
    ${({ isMovingIn }) =>
        isMovingIn &&
        css`
            animation: ${calendarFadeIn} 0.3s forwards;
        `}
`;

const ImageContainer = styled.div`
    display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 710px;
    height: 710px;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 710px;
    ${({ isVisible }) =>
        isVisible &&
        css`
            animation: ${fadeIn} 0.3s forwards;
        `}
    ${({ isMovingOut }) =>
        isMovingOut &&
        css`
            animation: ${fadeOut} 0.3s forwards;
        `}
`;

const ImageBox = styled.img`
    width: 650px;
    height: 650px;
    object-fit: cover;
    border-radius: 10px;
`;

const BlankBox = styled.div`
    width: 650px;
    height: 650px;
    background-color: rgba(237, 237, 237, 0.3);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;

const HasDiaryTopBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 650px;
    height: 50px;
    margin-bottom: 10px;
    z-index: 1;
`;

const NoDiaryTopBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 650px;
    height: 50px;
    margin-bottom: 10px;
    z-index: 1;
`;

const DateBox = styled.div`
    font-size: 20px;
    font-weight: 800;
    color: #0d0d0d;
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

const AddBtn = styled.button`
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

function MainPage() {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDateHasData, setSelectedDateHasData] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [text, setText] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isMovingOut, setIsMovingOut] = useState(false);
    const [isMovingIn, setIsMovingIn] = useState(false);

    const { memberID, getToken } = useAuth();
    const accessToken = getToken();

    const { year, setYear, month, setMonth } = useCalendar();
    const [data, setData] = useState([]);

    const [isSelectedYear, setIsSelectedYear] = useState(format(new Date(), "yyyy"));
    const [isSelectedMonth, setIsSelectedMonth] = useState(format(new Date(), "MM"));
    const [isSelectedDay, setIsSelectedDay] = useState(format(new Date(), "dd"));

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
            setIsMovingOut(true);
            setIsMovingIn(false);
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    setSelectedDate(null);
                    setSelectedDateHasData(false);
                    setIsMovingOut(false);
                    setIsMovingIn(true); // 상태를 In으로 전환
                }, 300); // fadeOut 애니메이션 시간과 동일하게 설정
            }, 300); // 이미지 컨테이너가 반으로 움직이는 시간
        } else {
            setSelectedDate(day);
            setSelectedDateHasData(true);
            setIsVisible(true);
            setIsMovingIn(true);
            setIsMovingOut(false);
            setTimeout(() => {
                setIsMovingIn(false);
            }, 300); // fadeIn 애니메이션 시간과 동일하게 설정
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

    const handleAdd = () => {
        const formattedDate = format(selectedDate, "yyyyMMdd");
        const currentYear = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        navigate(`/diary/${memberID}/${formattedDate}`, {
            state: { date: { currentYear, month, day } },
        });
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
            setIsVisible(true);
            } catch (error) {
            console.error("Error fetching data:", error);
            setSelectedDateHasData(false);
            setIsVisible(true);
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
                <CalendarContainer isMovingOut={isMovingOut} isMovingIn={isMovingIn}>
                    <CalendarProvider>
                        <Calendar2 onDateClick={handleDateClick} />
                    </CalendarProvider>
                </CalendarContainer>
                <ImageContainer isVisible={isVisible} isMovingIn={isMovingIn} isMovingOut={isMovingOut}>
                    {selectedDate && selectedDateHasData ? (
                        <>
                            <HasDiaryTopBox>
                                <RemoveBtn onClick={handleRemove}>삭제</RemoveBtn>
                                <DateBox>
                                    {isSelectedMonth}월 {isSelectedDay}일
                                </DateBox>
                                <EditBtn onClick={handleEdit}>수정</EditBtn>
                            </HasDiaryTopBox>
                            <ImageBox src={imageUrl} />
                        </>
                    ) : (
                        <>
                            <NoDiaryTopBox>
                                <DateBox>
                                    {isSelectedMonth}월 {isSelectedDay}일
                                </DateBox>
                                <AddBtn onClick={handleAdd}>저장</AddBtn>
                            </NoDiaryTopBox>
                            <BlankBox>
                                <RxImage size={50}/>
                                일기를 먼저 작성해주세요.
                            </BlankBox>
                        </>
                    )}
                </ImageContainer>
            </MainContent>
        </Body>
    );
}

export default MainPage;
