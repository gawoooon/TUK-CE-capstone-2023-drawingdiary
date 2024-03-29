import styled from "styled-components";
import Background from "../components/Background";
import SideBar from "../components/sidebar/SideBar";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import GrassGraph from "../components/grid/DaySquare";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text {
    margin: 0 0 10px 130px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const WriteHistory = styled.div`
  margin-left: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const HistoryContainer = styled.div`
  width: 1190px;
  height: 290px;
  margin: 100px 0 -100px 110px;
  padding: 10px;
`;

const StatsContainer = styled.div`
  width: 1190px;
  height: 240px;
  margin: 0 0 30px 120px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SentimentContainer = styled.div`
  width: 1190px;
  height: 200px;
  margin: 0 0 30px 120px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

function StatsPage() {
  return (
    <div>
      <Background>
        <Container>
          <ShortSidebar />
          <HistoryContainer>
            <WriteHistory>2024년에는 일기를 50편 썼어요!</WriteHistory>
            <GrassGraph/>
          </HistoryContainer>

          <text>수치</text>
          <StatsContainer>

          </StatsContainer>

          <text>1월 1주차 감정분석</text>
          <SentimentContainer>

          </SentimentContainer>
        </Container>
      </Background>
    </div>
  );
}

export default StatsPage;
