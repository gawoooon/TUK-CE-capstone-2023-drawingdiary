import React, { useState } from "react";
import styled from "styled-components";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import Calendar from "../components/Calendar";
import SideBar from "../components/sidebar/SideBar";

const Body = styled.body`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 60px 200px;
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
  transition: width 0.5s ease;
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
  transition: width 0.5s ease;
`;

function CalendarPage() {
  const [leftBoxWidth, setLeftBoxWidth] = useState("25%");
  const [rightBoxWidth, setRightBoxWidth] = useState("0%");
  const [showRightBox, setShowRightBox] = useState(false);

  const handleDateClick = () => {
    // BodyDayOneBox를 클릭했을 때 leftBoxWidth 변경
    setLeftBoxWidth("8%");
    setRightBoxWidth("27%");
    setShowRightBox(true);
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
