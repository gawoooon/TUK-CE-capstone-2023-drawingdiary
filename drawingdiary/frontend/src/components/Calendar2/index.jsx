import React, { useState } from "react";
import styled from "styled-components";
import { format, addMonths, subMonths } from "date-fns";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse } from "date-fns";
import { Icon } from "@iconify/react";

const CalendarBox = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderBox = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
`;

const HeaderStartBox = styled.div`
  display: flex;
  width: 33%;
  height: 70px;
`;

const HeaderMiddleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
  color: #090071;
  font-size: 20px;
  font-weight: 900;
`;

const HeaderMonth = styled.p`
  padding-right: 5px;
`;

const HeaderYear = styled.p`
  padding-right: 5px;
`;

const HeaderEndBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 33%;
  height: 100%;
  color: #b7b7b7;
  font-size: 40px;
  font-weight: 900;
`;

const DaysBox = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  font-weight: 600;
  font-size: 13px;
  box-sizing: border-box;
`;

const DayColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14%;
  height: 100%;
  color: #b7b7b7;
  border: 1px solid #e0e0e0;
  padding: 5px 0px;
  box-sizing: border-box;
`;

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  box-sizing: border-box;
`;

const BodyDaysBox = styled.div`
  display: flex;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
`;
const BodyDayOneBox = styled.div`
  display: flex;
  justify-content: center;
  width: 14%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #e0e0e0;
  pointer: cursor;
`;

const BodyMonth = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px;
  width: 100%;
  height: 13%;
  font-weight: 600;
  font-size: 15px;
  color: #090071;

  &.not-valid {
    color: #b7b7b7;
    cursor: default;
    height: 100%;
  }

  &.today {
    color: white;
    background-color: #88b0fd;
    width: 50%;
    border-radius: 50%;
  }
`;

const BodyDayOneBoxStyle = styled(BodyDayOneBox)`
 
  &.disabled {
     color:#b7b7b7;
  }

  &.selected {
     selected 클래스에 대한 스타일
  }



  &.valid {
     valid 클래스에 대한 스타일
  }



  &:hover {
    cursor: pointer;
    ${BodyMonth}:not(.not-valid) {
      color: white;
      background-color: #88b0fd;
      width: 50%;
      border-radius: 50%;
      cursor: pointer;
    }


  }



  
`;

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <HeaderBox>
      <HeaderStartBox />
      <HeaderMiddleBox>
        <HeaderMonth>{format(currentMonth, "MMMM")}</HeaderMonth>
        <HeaderYear>{format(currentMonth, "yyyy")}</HeaderYear>
      </HeaderMiddleBox>
      <HeaderEndBox>
        <GrFormPrevious onClick={prevMonth} />
        <MdNavigateNext onClick={nextMonth} />
      </HeaderEndBox>
    </HeaderBox>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(<DayColumn key={i}>{date[i]}</DayColumn>);
  }

  return <DaysBox>{days}</DaysBox>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  const today = new Date();

  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;

      const isToday = isSameDay(day, today);

      days.push(
        <BodyDayOneBoxStyle
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }${isToday ? "today" : ""}`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <BodyMonth
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : isToday
                ? "today"
                : ""
            }
          >
            {formattedDate}
          </BodyMonth>
        </BodyDayOneBoxStyle>
      );
      day = addDays(day, 1);
    }
    rows.push(<BodyDaysBox key={day}>{days}</BodyDaysBox>);
    days = [];
  }
  return <BodyBox>{rows}</BodyBox>;
};

function Calendar2() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <CalendarBox>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </CalendarBox>
  );
}

export default Calendar2;
