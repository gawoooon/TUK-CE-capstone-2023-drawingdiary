import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/sidebar/NavBar";
import GrassGraph from "../components/grid/DaySquare";
import { useAuth } from "../auth/context/AuthContext";
import Background2 from "../components/Background/index2";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  span {
    margin: 10px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const TotalHistory = styled.div`
  margin-top: 50px;
  font-size: 18px;
  font-weight: bold;
`;

const HistoryContainer = styled.div`
  width: 100%;
  height: 290px;
  margin: 10px;
  padding: 10px;
`;

const StatsContainer = styled.div`
  width: 100%;
  height: 190px;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SentimentContainer = styled.div`
  width: 100%;
  height: 250px;
  margin: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


function StatsPage() {

  const { memberID } = useAuth();
  const accessToken = localStorage.getItem("accessToken");

  const fetchSentimentData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistic', {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      console.log("감정분석 : ", response);
    } catch(error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchSentimentData();
  }, []);

  return (
    <div>
      <Background2>
        <Container>
          <NavBar />
          <HistoryContainer>
            <TotalHistory>2024년에는 일기를 50편 썼어요!</TotalHistory>
            <GrassGraph/>
          </HistoryContainer>

          <span>수치</span>
          <StatsContainer>

          </StatsContainer>

          <span>1월 1주차 감정분석</span>
          <SentimentContainer>

          </SentimentContainer>
        </Container>
      </Background2>
    </div>
  );
}

export default StatsPage;
