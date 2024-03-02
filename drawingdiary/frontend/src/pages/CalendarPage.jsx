import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isSameDay, setDate } from "date-fns";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import SideBar from "../components/sidebar/SideBar";
import FalseComponent from "../components/FalseComponent";
import { useAuth } from "../auth/context/AuthContext";

import { GrFormPreviousLink } from "react-icons/gr";
import { CalendarProvider, useCalendar } from "../components/Calendar2/CalendarProvider";
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
  box-shadow: 3px 10px 5px 0 rgba(0, 0, 0, 0.1);
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ leftBoxWidth }) => leftBoxWidth};
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 30px 0 0 30px;
  transition: opacity 200ms ease-out, width 200ms ease-out;
  margin-right: 20px;
`;

const MiddleBox = styled.div`
  display: flex;
  width: ${({ middleBoxWidth }) => middleBoxWidth};
  height: 100%;
  background-color: white;
  border-radius: 0 30px 30px 0;
  padding: 40px 10px;
  box-sizing: border-box;
  transition: opacity 200ms ease-out, width 200ms ease-out;
`;

const RightBox = styled.div`
  display: flex;
  opacity: ${({ showRightBox }) => (showRightBox ? 1 : 0)};
  width: ${({ rightBoxWidth }) => rightBoxWidth};
  flex-direction: column;
  height: 100%;
  padding: 40px 0;
  border-radius: 0 30px 30px 0;
  transition: opacity 1s ease-out, width 200ms ease-out;
  box-sizing: border-box;
  overflow: hidden; // 내용이 max-height를 넘어가지 않도록 설정
  max-height: ${({ showRightBox }) =>
    showRightBox ? "1000px" : "0"}; // 점차적으로 높이가 늘어나게 설정
`;

const PrevBtn = styled.button`
  display: ${({ prevBtnBox }) => (prevBtnBox ? "display" : "none")};
  width: 30px;
  height: 30px;
  font-size: 50px;
  color: #090071;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  transition: width 200ms linear;
`;

const ResultBox = styled.div`
  width: 100%;
  height: 95%;
`;

const TrueComponentBox = styled.div`
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

const TrueComponentMidBox = styled.div`
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

function CalendarPage() {
  const [leftBoxWidth, setLeftBoxWidth] = useState("25%");
  const [rightBoxWidth, setRightBoxWidth] = useState("0%");
  const [middleBoxWidth, setMiddleBoxWidth] = useState("75%");
  const [showRightBox, setShowRightBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateHasData, setSelectedDateHasData] = useState(false);
  const [prevBtnBox, setPrevBtnBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const { memberID } = useAuth();
  const accessToken = localStorage.getItem('accessToken');
  
  const { year, month } = useCalendar();
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const [isSelectedYear, setIsSelectedYear] = useState("");
  const [isSelectedMonth, setIsSelectedMonth] = useState("");
  const [isSelectedDay, setIsSelectedDay] = useState("");


  const handleDateClick = async (day) => {
    if (isSameDay(day, selectedDate)) {
      setSelectedDate(null);
      setLeftBoxWidth("25%");
      setRightBoxWidth("0%");
      setMiddleBoxWidth("75%");
      setShowRightBox(false);
      setSelectedDateHasData(false);
      setPrevBtnBox(false);
      setIsOpen(true);
    } else {
      setShowRightBox(true);
      setLeftBoxWidth("7%");
      setMiddleBoxWidth("65%");
      setRightBoxWidth("28%");
      setSelectedDate(day); // selectedDate 상태 업데이트
      setSelectedDateHasData(true); // // selectedDate에 데이터가 존재하는지
      setPrevBtnBox(true);
      setIsLoading(true); // 데이터 로딩 시작
      setIsOpen(false);
    }
  };

  // PrevBtn 클릭 시
  const handlePrevBtnClick = () => {
    if (selectedDate) {
      console.log("PrevBtn clicked. Selected Date:", selectedDate);
      handleDateClick(selectedDate);
    }
  };

  const handleEdit = () => {
    // 로그인 로직을 처리한 후 '/calendar' 페이지로 이동
    const formattedDate = format(selectedDate, "yyyyMMdd");
    console.log(selectedDate);
    navigate(`/diary/${memberID}/${formattedDate}`, {
      state: { date: { isSelectedYear, isSelectedMonth, isSelectedDay } },
    });
  };

  const handleRemove = async () => {

    try {
      const response = await axios.delete(`http://localhost:8080/api/diary/${isSelectedYear}-${isSelectedMonth}-${isSelectedDay}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      fetchCalendar();
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error.response.data);
    }
  };

  const fetchCalendar = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/calender/${year}-${month}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      setData(response.data);
    } catch (error) {
      console.log("error: ", error);
    };
  };

  // fetchData 함수를 useEffect 외부에서 선언
  const fetchData = async (date) => {
    try {
      
      // 실제 데이터를 받아오는 부분
      const dateArray = data.map(entry => entry.date);
      console.log("dataArray: ", dateArray);

      // isSameDay함수를 사용하여 selectedDate와 일치하는 날짜를 찾음
      const index = data.findIndex((item) =>
        isSameDay(new Date(item.date), date),
      );
      console.log("index: ", index);

      //일치하면 인덱스 값/ 아니면 -1 반환 => 존재하면 true, 존재하지 않으면 false
      if(index !== -1) {
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
    fetchCalendar();

    const fetchDataAndUpdateState = async () => {
      if (selectedDate) {
        setIsLoading(true);
        setIsSelectedYear(format(selectedDate, "yyyy"));
        setIsSelectedMonth(format(selectedDate, "MM"));
        setIsSelectedDay(format(selectedDate, "dd"));

        try {
          // 클릭한 날짜
          const hasData = await fetchData(selectedDate);

          // 데이터 확인 결과에 따라 상태 업데이트
          setSelectedDateHasData(hasData);
          // console.log("data:", hasData);
        } catch (error) {
          console.error("Error fetching data:", error);
          // 에러가 발생하면 데이터가 없는 것으로 간주
          setSelectedDateHasData(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDataAndUpdateState();
  }, [selectedDate, handleRemove]);

  return (
    <Background>
      <Body>
        <CalendarBox>
          <LeftBox leftBoxWidth={leftBoxWidth}>
            <SideBar isOpen={isOpen} />
          </LeftBox>
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
                        {isSelectedMonth}월{isSelectedDay}일
                      </DateBox>
                      <EditBtn onClick={handleEdit}>편집</EditBtn>
                    </TopBox>
                    <TrueComponentMidBox><ImageBox src={imageUrl} /></TrueComponentMidBox>
                    <Divider />
                    <BottomBox>{text}</BottomBox>
                  </TrueComponentBox>

                ) : (
                  <FalseComponent
                    year={selectedDate.getFullYear()}
                    month={selectedDate.getMonth() + 1}
                    day={selectedDate.getDate()}
                    selectedDate={selectedDate}
                  />
                ))}
            </ResultBox>
          </RightBox>
        </CalendarBox>
      </Body>
    </Background>
  );
}

export default CalendarPage;
