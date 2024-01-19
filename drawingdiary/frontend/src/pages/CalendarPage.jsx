import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import SideBar from "../components/sidebar/SideBar";

import { IoMdPerson } from "react-icons/io";

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
  box-shadow: 3px 10px 5px 0 rgba(0, 0, 0, 0.1);
`;
const LeftBox = styled.div`
  display: flex;
  width: 25%;
  background-color: #f9f9f9;
  border-radius: 30px 0 0 30px;
`;

const RightBox = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  background-color: white;
  border-radius: 0 30px 30px 0;
  padding: 40px 60px;
  box-sizing: border-box;
`;

function CalendarPage() {
  return (
    <Background>
      <Body>
        <CalendarBox>
          <LeftBox>
            <SideBar />
          </LeftBox>
          <RightBox>
            <Calendar2 />
          </RightBox>
        </CalendarBox>
      </Body>
    </Background>
  );
}

export default CalendarPage;
