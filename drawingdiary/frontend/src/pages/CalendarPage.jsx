import React, { useState } from "react";
import styled from "styled-components";
import { isSameDay } from "date-fns";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import Calendar from "../components/Calendar";
import SideBar from "../components/sidebar/SideBar";

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
`;

const MiddleBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  background-color: white;
  border-radius: 0 30px 30px 0;
  padding: 40px 60px;
  box-sizing: border-box;
`;

const RightBox = styled.div`
  display: ${({ showRightBox }) => (showRightBox ? "flex" : "none")};
  width: ${({ rightBoxWidth }) => rightBoxWidth};
  height: 100%;

  border-radius: 0 30px 30px 0;
  transition: width 0.5s linear;
`;

function CalendarPage() {
  const [leftBoxWidth, setLeftBoxWidth] = useState("25%");
  const [rightBoxWidth, setRightBoxWidth] = useState("0%");
  const [showRightBox, setShowRightBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // CalendarPage 컴포넌트에서 handleDateClick 함수 수정
  const handleDateClick = (day) => {
    if (isSameDay(day, selectedDate)) {
      // 이미 선택된 날짜를 클릭했을 때
      setLeftBoxWidth("25%");
      setRightBoxWidth("0%");
      setShowRightBox(false);
      setSelectedDate(null);
      console.log("Hello, World!");
    } else {
      // 새로운 날짜를 선택했거나 이전에 선택한 날짜를 클릭했을 때
      setLeftBoxWidth("8%");
      setRightBoxWidth("27%");
      setShowRightBox(true);
      setSelectedDate(day);
    }
  };
  return (
    <Background>
      <Body>
        <CalendarBox>
          <LeftBox leftBoxWidth={leftBoxWidth}>
            <SideBar />
          </LeftBox>

          <Calendar2
            leftBoxWidth={leftBoxWidth}
            onDateClick={handleDateClick}
          />

          <RightBox showRightBox={showRightBox} rightBoxWidth={rightBoxWidth}>
            dd
          </RightBox>
        </CalendarBox>
      </Body>
    </Background>
  );
}

export default CalendarPage;
