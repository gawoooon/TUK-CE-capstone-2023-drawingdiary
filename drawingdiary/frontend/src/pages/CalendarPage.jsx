import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isSameDay } from "date-fns";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import Calendar from "../components/Calendar";
import SideBar from "../components/sidebar/SideBar";
import TrueComponent from "../components/TrueComponent";
import FalseComponent from "../components/FalseComponent";

import { GrFormPreviousLink } from "react-icons/gr";

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
  width: ${({ leftBoxWidth }) => leftBoxWidth};
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 30px 0 0 30px;
  transition: width 0.5s linear;
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
  transition: width 0.5s linear;
`;

const RightBox = styled.div`
  display: ${({ showRightBox }) => (showRightBox ? "flex" : "none")};
  width: ${({ rightBoxWidth }) => rightBoxWidth};
  height: 100%;
  padding: 40px 0;
  border-radius: 0 30px 30px 0;
  transition: width 0.5s linear;
`;

const PrevBtn = styled.button`
  height: 50px;
  font-size: 50px;
  color: #090071;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  transition: width 0.5s linear;
`;

function CalendarPage() {
  const [leftBoxWidth, setLeftBoxWidth] = useState("23%");
  const [rightBoxWidth, setRightBoxWidth] = useState("2%");
  const [middleBoxWidth, setMiddleBoxWidth] = useState("75%");
  const [showRightBox, setShowRightBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateHasData, setSelectedDateHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // CalendarPage 컴포넌트에서 handleDateClick 함수 수정
  const handleDateClick = async (day) => {
    if (isSameDay(day, selectedDate)) {
      console.log("handleDateClick11 called. Selected Date:", day);
      // 이미 선택된 날짜를 클릭했을 때
      setSelectedDate(null);
      setLeftBoxWidth("23%");
      setRightBoxWidth("2%");
      setMiddleBoxWidth("75%");
      setShowRightBox(false);
      setSelectedDateHasData(false);
    } else {
      console.log("handleDateClick22 called. Selected Date:", day);
      // 새로운 날짜를 선택했거나 이전에 선택한 날짜를 클릭했을 때
      setShowRightBox(true);
      setLeftBoxWidth("10%");
      setMiddleBoxWidth("60%");
      setRightBoxWidth("30%");
      setSelectedDate(day);
      setSelectedDateHasData(true);

      setIsLoading(true); // 데이터 로딩 시작

      try {
        // 클릭한 날짜
        const year = day.getFullYear();
        const month = day.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
        const date = day.getDate();

        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDate = date < 10 ? `0${date}` : `${date}`;

        const formattedNumber = `${year}-${formattedMonth}-${formattedDate}`;

        console.log("Clicked date as number:", formattedNumber);

        // fetchData 함수를 비동기적으로 호출하고 데이터 확인
        const hasData = await fetchData(selectedDate);

        // 데이터 확인 결과에 따라 상태 업데이트
        setSelectedDateHasData(hasData);
        console.log(hasData);
        console.log(setSelectedDateHasData(hasData));
      } catch (error) {
        console.error("Error fetching data:", error);
        // 에러가 발생하면 데이터가 없는 것으로 간주
        setSelectedDateHasData(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // PrevBtn 클릭 시 handlePrevBtnClick 함수 호출
  const handlePrevBtnClick = () => {
    if (selectedDate) {
      console.log("PrevBtn clicked. Selected Date:", selectedDate);
      handleDateClick(selectedDate);
      // 여기에 실제 데이터 확인 로직을 추가하세요
    }
  };

  // fetchData 함수를 useEffect 외부에서 선언
  const fetchData = async (date) => {
    try {
      // 데이터를 가져오는 시뮬레이션 함수
      const simulateDataFetch = () => {
        return new Promise((resolve) => {
          const dataArray = [
            { date: "2024-01-23", data: "true" },
            { date: "2024-01-24", data: "false" },
          ];
          resolve(dataArray);
        });
      };

      // 실제 데이터를 받아오는 부분
      const dataArray = await simulateDataFetch();

      // Use findIndex instead of some to get the index of the matching date
      const index = dataArray.findIndex((item) =>
        isSameDay(new Date(item.date), date)
      );

      // Check if the index is valid and resolve accordingly
      const hasData = index !== -1;
      return hasData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false; // 에러가 발생하면 데이터가 없는 것으로 처리
    }
  };

  // useEffect 내부에서 fetchData 함수 호출
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (selectedDate) {
        setIsLoading(true);

        try {
          // 클릭한 날짜
          const hasData = await fetchData(selectedDate);

          // 데이터 확인 결과에 따라 상태 업데이트
          setSelectedDateHasData(hasData);
          console.log(hasData);
          console.log(setSelectedDateHasData(hasData));
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
  }, [selectedDate]);

  return (
    <Background>
      <Body>
        <CalendarBox>
          <LeftBox leftBoxWidth={leftBoxWidth}>
            <SideBar />
          </LeftBox>
          <MiddleBox middleBoxWidth={middleBoxWidth}>
            <Calendar2
              leftBoxWidth={leftBoxWidth}
              onDateClick={handleDateClick}
            />
          </MiddleBox>

          <RightBox showRightBox={showRightBox} rightBoxWidth={rightBoxWidth}>
            <PrevBtn onClick={handlePrevBtnClick}>
              <GrFormPreviousLink />
            </PrevBtn>
            {selectedDate &&
              (selectedDateHasData ? <TrueComponent /> : <FalseComponent />)}
          </RightBox>
        </CalendarBox>
      </Body>
    </Background>
  );
}

export default CalendarPage;
