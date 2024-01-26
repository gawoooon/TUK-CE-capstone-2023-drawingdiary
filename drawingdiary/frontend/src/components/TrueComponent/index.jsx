import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 30px 30px 30px 0px;
  box-sizing: border-box;
  transition: width 0.5s linear;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5%;
`;

const DateBox = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: #090071;
  padding-left: 20px;
`;

const EditBtn = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  outline: none;
  background-color: #090071;
  font-size: 20px;
  font-weight: 400;
  color: white;
  cursor: pointer;
  box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 15px;
`;

const MiddleBox = styled.div`
  width: 100%;
  height: 55%;
  border: 3px solid #090071;
  border-radius: 30px;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 30%;
  border: 3px solid #090071;
  border-radius: 30px;
`;

function TrueComponent({ month, day }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    // 로그인 로직을 처리한 후 '/calendar' 페이지로 이동
    navigate("/diary/:id");
  };

  return (
    <ResultBox>
      <TopBox>
        <DateBox>
          {month}월{day}일
        </DateBox>
        <EditBtn onClick={handleEdit}>Edit</EditBtn>
      </TopBox>
      <MiddleBox></MiddleBox>
      <BottomBox></BottomBox>
    </ResultBox>
  );
}

export default TrueComponent;
