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
  font-weight: 1000;
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
  font-weight: 1000;
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

function Calendar2() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <CalendarBox>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
    </CalendarBox>
  );
}

export default Calendar2;
