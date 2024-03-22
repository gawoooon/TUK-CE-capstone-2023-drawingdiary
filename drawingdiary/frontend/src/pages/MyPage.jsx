import styled from "styled-components";
import Background from "../components/Background";
import ShortSidebar from "../components/sidebar/ShortSidebar";

const MyPageBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MyPageBox = styled.div`
  width: 900px;
  height: 800px;
  background-color: white;
  box-shadow: 3px 10px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 50px 0;
  box-sizing: border-box;
`;

const MyPageTopBox = styled.div`
  width: 100%;
  height: 35%;
  background-color: pink;
`;

const MyPageBottomBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoBox = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 3px solid #a3a3a3;
  box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  box-sizing: border-box;
`;

const InfoTop = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: rgba(106, 156, 253, 0.3);
  box-shadow: 1px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;

const InfoBottom = styled.div`
  width: 100%;
  height: 85%;
  padding: 20px 0px;
  background-color: rgba(106, 156, 253, 0.3);
  box-sizing: border-box;
`;

function MyPage() {
  return (
    <div>
      <Background>
        <ShortSidebar />
        <MyPageBody>
          <MyPageBox>
            <MyPageTopBox></MyPageTopBox>
            <MyPageBottomBox>
              <InfoBox>
                <InfoTop>
                  기본정보
                  <InfoBtn>수정</InfoBtn>
                </InfoTop>
                <InfoBottom></InfoBottom>
              </InfoBox>
            </MyPageBottomBox>
          </MyPageBox>
        </MyPageBody>
      </Background>
    </div>
  );
}

export default MyPage;
