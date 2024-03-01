import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isSameDay } from "date-fns";

import Background from "../components/Background";
import Calendar2 from "../components/Calendar2";
import SideBar from "../components/sidebar/SideBar";
import TrueComponent from "../components/TrueComponent";
import FalseComponent from "../components/FalseComponent";
import { useAuth } from "../auth/context/AuthContext";

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

function CalendarPage() {
  const [leftBoxWidth, setLeftBoxWidth] = useState("25%");
  const [rightBoxWidth, setRightBoxWidth] = useState("0%");
  const [middleBoxWidth, setMiddleBoxWidth] = useState("75%");
  const [showRightBox, setShowRightBox] = useState(false);
  const [showProfileBox, setShowProfileBox] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateHasData, setSelectedDateHasData] = useState(false);
  const [prevBtnBox, setPrevBtnBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { memberID } = useAuth();

  const handleDateClick = async (day) => {
    console.log(memberID);
    if (isSameDay(day, selectedDate)) {
      setSelectedDate(null);
      setLeftBoxWidth("25%");
      setRightBoxWidth("0%");
      setMiddleBoxWidth("75%");
      setShowRightBox(false);
      setShowProfileBox(true);
      setSelectedDateHasData(false);
      setPrevBtnBox(false);
      setIsOpen(true);
    } else {
      setShowRightBox(true);
      setShowProfileBox(false);
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
  }, [selectedDate]);

  return (
    <Background>
      <Body>
        <CalendarBox>
          <LeftBox leftBoxWidth={leftBoxWidth}>
            <SideBar isOpen={isOpen} />
          </LeftBox>
          <MiddleBox middleBoxWidth={middleBoxWidth}>
            <Calendar2
              leftBoxWidth={leftBoxWidth}
              onDateClick={handleDateClick}
            />
          </MiddleBox>

          <RightBox showRightBox={showRightBox} rightBoxWidth={rightBoxWidth}>
            <PrevBtn prevBtnBox={prevBtnBox} onClick={handlePrevBtnClick}>
              <GrFormPreviousLink />
            </PrevBtn>
            <ResultBox>
              {" "}
              {selectedDate &&
                (selectedDateHasData ? (
                  <TrueComponent
                    year={selectedDate.getFullYear()}
                    month={selectedDate.getMonth() + 1}
                    day={selectedDate.getDate()}
                    selectedDate={selectedDate}
                  />
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
