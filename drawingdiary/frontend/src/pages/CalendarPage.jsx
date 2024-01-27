import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isSameDay } from "date-fns";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import SideBar from "../components/sidebar/SideBar";
import TrueComponent from "../components/TrueComponent";
import FalseComponent from "../components/FalseComponent";
import CalendarProfile from "../components/CalendarProfile";

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
  flex-direction: column;
  width: ${({ leftBoxWidth }) => leftBoxWidth};
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 30px 0 0 30px;
  transition: width 0.5s linear;
  margin-right: 20px;
`;

const LeftTopBox = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
`;

const ProfileBox = styled.div`
  display: ${({ showProfileBox }) => (showProfileBox ? "flex" : "none")};
  width: 100%;
  height: 100%;
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
  flex-direction: column;
  height: 100%;
  padding: 40px 0;
  border-radius: 0 30px 30px 0;
  transition: width 0.5s linear;
  box-sizing: border-box;
`;

const PrevBtn = styled.button`
  width: 5%;
  height: 5%;
  font-size: 50px;
  color: #090071;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  transition: width 0.5s linear;
`;

const ResultBox = styled.div`
  width: 100%;
  height: 95%;
`;

function CalendarPage() {
  const [leftBoxWidth, setLeftBoxWidth] = useState("23%");
  const [rightBoxWidth, setRightBoxWidth] = useState("2%");
  const [middleBoxWidth, setMiddleBoxWidth] = useState("75%");
  const [showRightBox, setShowRightBox] = useState(false);
  const [showProfileBox, setShowProfileBox] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateHasData, setSelectedDateHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateClick = async (day) => {
    if (isSameDay(day, selectedDate)) {
      setSelectedDate(null);
      setLeftBoxWidth("23%");
      setRightBoxWidth("2%");
      setMiddleBoxWidth("75%");
      setShowRightBox(false);
      setShowProfileBox(true);
      setSelectedDateHasData(false);
    } else {
      setShowRightBox(true);
      setShowProfileBox(false);
      setLeftBoxWidth("10%");
      setMiddleBoxWidth("60%");
      setRightBoxWidth("30%");
      setSelectedDate(day); // selectedDate 상태 업데이트
      setSelectedDateHasData(true); // // selectedDate에 데이터가 존재하는지

      setIsLoading(true); // 데이터 로딩 시작
    }
  };

  // PrevBtn 클릭 시
  const handlePrevBtnClick = () => {
    if (selectedDate) {
      console.log("PrevBtn clicked. Selected Date:", selectedDate);
      handleDateClick(selectedDate);
    }
  };

  // fetchData 함수를 useEffect 외부에서 선언
  const fetchData = async (date) => {
    try {
      // 데이터를 가져옴
      const simulateDataFetch = () => {
        return new Promise((resolve) => {
          const dataArray = [{ date: "2024-01-23" }, { date: "2024-01-24" }];
          resolve(dataArray);
        });
      };

      // 실제 데이터를 받아오는 부분
      const dataArray = await simulateDataFetch();

      // isSameDay함수를 사용하여 selectedDate와 일치하는 날짜를 찾음
      const index = dataArray.findIndex((item) =>
        isSameDay(new Date(item.date), date)
      );

      //일치하면 인덱스 값/ 아니면 -1 반환 => 존재하면 true, 존재하지 않으면 false
      const hasData = index !== -1;
      return hasData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false; // 에러가 발생하면 데이터가 없는 것으로 처리
    }
  };

  // useEffect 내부에서 fetchData 함수 호출(변경 감지)
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (selectedDate) {
        setIsLoading(true);

        try {
          // 클릭한 날짜
          const hasData = await fetchData(selectedDate);

          // 데이터 확인 결과에 따라 상태 업데이트
          setSelectedDateHasData(hasData);
          console.log("data:", hasData);
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
            <LeftTopBox>
              <ProfileBox showProfileBox={showProfileBox}>
                <CalendarProfile />
              </ProfileBox>
            </LeftTopBox>
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
            <ResultBox>
              {" "}
              {selectedDate &&
                (selectedDateHasData ? (
                  <TrueComponent
                    month={selectedDate.getMonth() + 1}
                    day={selectedDate.getDate()}
                  />
                ) : (
                  <FalseComponent
                    month={selectedDate.getMonth() + 1}
                    day={selectedDate.getDate()}
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
