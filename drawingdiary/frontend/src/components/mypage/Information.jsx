import styled from "styled-components";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import Line from "./Line";

const InfoBox = styled.div`
  width: 100%;
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
  padding: 15px 30px;
  box-sizing: border-box;
`;

const InfoProfileBox = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(163, 163, 163, 0.3);
  padding: 10px 0;
  box-sizing: border-box;
`;

const InfoProfileImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background-color: pink;
`;

const InfoProfileNameEmailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 30px;
  box-sizing: border-box;
`;

const InfoProfileName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const InfoProfileEmail = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

function Information() {
  return (
    <InfoBox>
      <InfoTop>
        기본정보
        <InfoBtn>수정</InfoBtn>
      </InfoTop>
      <InfoBottom>
        <InfoProfileBox>
          <InfoProfileImg></InfoProfileImg>
          <InfoProfileNameEmailBox>
            <InfoProfileName>Name</InfoProfileName>
            <InfoProfileEmail>0000@gmail.com</InfoProfileEmail>
          </InfoProfileNameEmailBox>
        </InfoProfileBox>
        <Line
          icon={MdOutlinePhoneIphone}
          text="010-0000-0000"
          hasBorder={true}
        />
        <Line icon={MdEmail} text="000000@gmail.com" hasBorder={true} />
        <Line icon={FaBirthdayCake} text="2002/12/12" hasBorder={false} />
      </InfoBottom>
    </InfoBox>
  );
}

export default Information;
