import styled from "styled-components";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
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
  padding: 30px 20px 15px 20px;
  box-sizing: border-box;
`;

function Information({
  onPopupPassword,
  profileEmail,
  profileName,
  profileBirth,
  profilePhone,
}) {
  // 전화번호를 ###-####-#### 형식으로 변경하는 함수
  const formatPhoneNumber = (phoneNumber) => {
    // 전화번호 형식 변환
    const formattedNumber = phoneNumber.replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3"
    );
    return formattedNumber;
  };

  return (
    <InfoBox>
      <InfoTop>
        기본정보
        <InfoBtn onClick={onPopupPassword}>수정</InfoBtn>
      </InfoTop>
      <InfoBottom>
        <Line icon={IoMdPerson} text={profileName} hasBorder={true} />
        <Line
          icon={MdOutlinePhoneIphone}
          text={formatPhoneNumber(profilePhone)}
          hasBorder={true}
        />
        <Line icon={MdEmail} text={profileEmail} hasBorder={true} />
        <Line icon={FaBirthdayCake} text={profileBirth} hasBorder={false} />
      </InfoBottom>
    </InfoBox>
  );
}

export default Information;
