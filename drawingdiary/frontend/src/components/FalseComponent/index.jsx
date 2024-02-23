import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: opacity 800ms ease-out;
`;

const TopBox = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #090071;
  display: flex;
`;

const MiddleBox = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #090071;
  padding: 10px 0px;
  box-sizing: border-box;
`;

const AddBtn = styled.button`
  width: 120px;
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
  margin-top: 20px;
`;

function FalseComponent({ year, month, day }) {
  const navigate = useNavigate();

  const handleAdd = () => {
    // 로그인 로직을 처리한 후 '/calendar' 페이지로 이동
    navigate("/diary/1", { state: {date: { year, month, day }}});
  };

  return (
    <ResultBox>
      <TopBox>
        {month}월{day}일
      </TopBox>
      <MiddleBox>일기를 작성하세요.</MiddleBox>

      <AddBtn onClick={handleAdd}>추가하기</AddBtn>
    </ResultBox>
  );
}

export default FalseComponent;
