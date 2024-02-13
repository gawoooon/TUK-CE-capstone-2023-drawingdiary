import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import CalendarPage from "../../pages/CalendarPage";

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 100%;
`;

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ede7f6;
  border-radius: 50%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  padding: 35px 0 0 10px;
  box-sizing: border-box;
`;

const Name = styled.div`
  color: #090071;
  font-size: 20px;
  font-weight: 800;
`;

const Email = styled.div`
  color: #6964a7;
  font-size: 15px;
  font-weight: 800;
`;

function CalendarProfile() {
  return (
    <ProfileBox>
      <ProfileImg></ProfileImg>
      <TextBox>
        <Name>홍길동</Name>
        <Email>000@anver.com</Email>
      </TextBox>
    </ProfileBox>
  );
}

export default CalendarProfile;
