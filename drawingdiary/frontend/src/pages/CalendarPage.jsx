import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { isSameDay } from "date-fns";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import Background2 from "../components/Background/index2";
import Calendar2 from "../components/Calendar2";
import SideBar from "../components/sidebar/SideBar";
import FalseComponent from "../components/FalseComponent";
import { useAuth } from "../auth/context/AuthContext";

import { GrFormPreviousLink } from "react-icons/gr";
import {
  CalendarProvider,
  useCalendar,
} from "../components/Calendar2/CalendarProvider";
import axios from "axios";

const Body = styled.body`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 60px 100px;
  box-sizing: border-box;
`;

const CalendarBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: white;
  padding-left: 20px;
  transition: opacity 200ms ease-out;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ leftBoxWidth }) => leftBoxWidth};
  height: 100%;
  margin-right: 20px;
  transition: opacity 200ms ease-out, width 200ms linear;
`;

const MiddleBox = styled.div`
  display: flex;
  width: ${({ middleBoxWidth }) => middleBoxWidth};
  height: 100%;
  border-radius: 30px;
  padding: 40px 10px;
  box-sizing: border-box;
  transition: opacity 200ms ease-out, width 200ms linear;
`;

const RightBox = styled.div`
  display: flex;
  width: ${({ rightBoxWidth }) => rightBoxWidth};
  flex-direction: column;
  height: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  overflow: hidden; // 내용이 max-height를 넘어가지 않도록 설정
  transition: opacity 200ms ease-out, width 200ms linear;
`;

const PrevBtn = styled.button`
  margin-top: 15px;
  display: ${({ prevBtnBox }) => (prevBtnBox ? "display" : "none")};
  width: 35px;
  height: 35px;
  font-size: 35px;
  color: #090071;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  transition: opacity 200ms ease-out, width 200ms linear;
`;

const ResultBox = styled.div`
  width: 100%;
  height: 95%;
  transition: opacity 200ms ease-out;
`;

const TrueComponentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-left: 15px;
  padding: 30px 50px 10px 0;
  box-sizing: border-box;
  transition: opacity 200ms ease-out, width 200ms linear;
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

const TrueComponentMidBox = styled.div`
  width: 100%;
  height: 50%;
  border: none;
  border-radius: 30px;
  transition: opacity 200ms ease-out, width 200ms linear;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px;
  margin-top: 20px;
  transition: opacity 200ms ease-out, width 200ms linear;
`;

const BottomBox = styled.div`
  width: 95%;
  height: 30%;
  border: none;
  border-radius: 30px;
  padding: 8px;
  line-height: 1.3;
  margin-top: 40px;
  transition: opacity 200ms ease-out, width 200ms linear;
`;

function CalendarPage() {
  const navigate = useNavigate();

  const [leftBoxWidth, setLeftBoxWidth] = useState("17%");
  const [rightBoxWidth, setRightBoxWidth] = useState("0%");
  const [middleBoxWidth, setMiddleBoxWidth] = useState("100%");
  const [showRightBox, setShowRightBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateHasData, setSelectedDateHasData] = useState(false);
  const [prevBtnBox, setPrevBtnBox] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const { memberID, getToken } = useAuth();
  const accessToken = getToken();

  const { year, setYear, month, setMonth } = useCalendar();
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");

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
      setLeftBoxWidth("17%");
      setRightBoxWidth("0%");
      setMiddleBoxWidth("100%");
      setShowRightBox(false);
      setSelectedDateHasData(false);
      setPrevBtnBox(false);
      setIsOpen(true);
    } else {
      setShowRightBox(true);
      setLeftBoxWidth("0%");
      setMiddleBoxWidth("87%");
      setRightBoxWidth("30%");
      setSelectedDate(day); // selectedDate 상태 업데이트
      setSelectedDateHasData(true); // // selectedDate에 데이터가 존재하는지
      setPrevBtnBox(true);
      setIsOpen(false);
    }
  };

  // PrevBtn 클릭 시
  const handlePrevBtnClick = () => {
    if (selectedDate) {
      handleDateClick(selectedDate);
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
      window.location.replace('/');
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
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // fetchData 함수를 useEffect 외부에서 선언
  const fetchData = async (date) => {
    try {
      // isSameDay함수를 사용하여 selectedDate와 일치하는 날짜를 찾음
      const index = data.findIndex((item) =>
        isSameDay(new Date(item.date), date)
      );

      //일치하면 인덱스 값/ 아니면 -1 반환 => 존재하면 true, 존재하지 않으면 false
      if (index !== -1) {
        setText(data[index].text);
        setImageUrl(data[index].imageFile);
      }
      const hasData = index !== -1;
      return hasData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false; // 에러가 발생하면 데이터가 없는 것으로 처리
    }
  };

  // useEffect 내부에서 fetchData 함수 호출(변경 감지)
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
          // 클릭한 날짜
          const hasData = await fetchData(selectedDate);

          // 데이터 확인 결과에 따라 상태 업데이트
          setSelectedDateHasData(hasData);
        } catch (error) {
          console.error("Error fetching data:", error);
          // 에러가 발생하면 데이터가 없는 것으로 간주
          setSelectedDateHasData(false);
        }
      }
    };

    fetchDataAndUpdateState();
  }, [selectedDate]);

  return (
    <Background2>
      <Body>
        <LeftBox leftBoxWidth={leftBoxWidth}>
          <SideBar
            isOpen={isOpen}
          />
        </LeftBox>
        <CalendarBox>
          <MiddleBox middleBoxWidth={middleBoxWidth}>
            <CalendarProvider>
              <Calendar2
                leftBoxWidth={leftBoxWidth}
                onDateClick={handleDateClick}
              />
            </CalendarProvider>
          </MiddleBox>

          <RightBox showRightBox={showRightBox} rightBoxWidth={rightBoxWidth}>
            <PrevBtn prevBtnBox={prevBtnBox} onClick={handlePrevBtnClick}>
              <GrFormPreviousLink />
            </PrevBtn>
            <ResultBox>
              {" "}
              {selectedDate &&
                (selectedDateHasData ? (
                  <TrueComponentBox>
                    <TopBox>
                      <RemoveBtn onClick={handleRemove}>삭제</RemoveBtn>
                      <DateBox>
                        {isSelectedMonth}월 {isSelectedDay}일
                      </DateBox>
                      <EditBtn onClick={handleEdit}>편집</EditBtn>
                    </TopBox>
                    <TrueComponentMidBox>
                      <ImageBox src={imageUrl} />
                    </TrueComponentMidBox>

                    <BottomBox>{text}</BottomBox>
                  </TrueComponentBox>
                ) : (
                  <FalseComponent
                    currentYear={selectedDate.getFullYear()}
                    month={selectedDate.getMonth() + 1}
                    day={selectedDate.getDate()}
                    selectedDate={selectedDate}
                  />
                ))}
            </ResultBox>
          </RightBox>
        </CalendarBox>
      </Body>
    </Background2>
  );
}

export default CalendarPage;
