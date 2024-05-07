import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/sidebar/NavBar";
import GrassGraph from "../components/grid/DaySquare";
import { useAuth } from "../auth/context/AuthContext";
import Background2 from "../components/Background/index2";
import { format } from 'date-fns';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0 30px 0;
  display: flex;
  flex-direction: column;
  span {
    margin: 10px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const TotalHistory = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const HistoryContainer = styled.div`
  width: 100%;
  height: 25%;
  margin: 10px;
  padding: 10px;
`;

const StatsContainer = styled.div`
  width: 100%;
  height: 20%;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SentimentContainer = styled.div`
  width: 100%;
  height: 20%;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


function StatsPage() {

  const { memberID } = useAuth();
  const accessToken = localStorage.getItem("accessToken");

  const [totalDairy, setTotalDiary] = useState("");
  const date = new Date();
  console.log(date);
  const year = format(date, "yyyy");

  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');

  const [sentiRecord, setSentiRecord] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistic',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      
      setTotalDiary(response.data.lawn.total);
      
      console.log("감정분석 : ", response);
      setSentiRecord()
    } catch(error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Background2>
        <Container>
          <NavBar />
          <HistoryContainer>
            <TotalHistory>{year}년에는 일기를 {totalDairy}편 썼어요!</TotalHistory>
            <GrassGraph/>
          </HistoryContainer>

          <span>수치</span>
          <StatsContainer>

          </StatsContainer>

          <span>{month}월 {week}주차 감정분석</span>
          <SentimentContainer>

          </SentimentContainer>
        </Container>
      </Background2>
    </div>
  );
}

export default StatsPage;
