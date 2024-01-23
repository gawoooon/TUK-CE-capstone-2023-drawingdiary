import React, { useState } from "react";
import styled from "styled-components";
import { format, addMonths, subMonths } from "date-fns";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";

const CalendarBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: width 0.5s linear;
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
  border: 1px solid rgba(224, 224, 224, 0.5);
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
    background-color: #4f8cff;
    width: 50%;
    border-radius: 50%;
  }
`;

const BodyDayOneBox = styled.div`
  display: flex;
  justify-content: center;
  width: 14%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(224, 224, 224, 0.5);
  transition: width 0.5s linear;

  &:hover {
    cursor: pointer;
    ${BodyMonth}:not(.not-valid) {
      color: white;
      background-color: #88b0fd;
      width: 50%;
      border-radius: 50%;
    }
  }

  &.selected {
    ${BodyMonth}:not(.today, .not-valid) {
      color: white;
      background-color: #88b0fd;
      width: 50%;
      border-radius: 50%;
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

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick: cellOnDateClick,
}) => {
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
      const isClicked = isSameDay(day, selectedDate);

      days.push(
        <BodyDayOneBox
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }${isToday ? "today" : ""}${isClicked ? " clicked" : ""} ${
            isClicked ? " selected" : ""
          }`}
          key={day}
          onClick={() => cellOnDateClick(cloneDay)}
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
        </BodyDayOneBox>
      );
      day = addDays(day, 1);
    }
    rows.push(<BodyDaysBox key={day}>{days}</BodyDaysBox>);
    days = [];
  }
  return <BodyBox>{rows}</BodyBox>;
};

function Calendar2({ onDateClick: parentOnDateClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    if (isSameDay(day, selectedDate)) {
      // 같은 날짜를 다시 클릭한 경우, 상태를 원상복구
      setSelectedDate(null);
      parentOnDateClick(day);
    } else {
      setSelectedDate(day);
      parentOnDateClick(day);
    }
  };

  return (
    <CalendarBox style={{}}>
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
