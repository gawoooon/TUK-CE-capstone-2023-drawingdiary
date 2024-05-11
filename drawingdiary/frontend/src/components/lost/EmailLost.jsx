import React from "react";
import styled from "styled-components";

// 배경 스타일드 컴포넌트
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* 투명한 검은 배경 */
  z-index: 999; /* 팝업보다 앞에 위치 */
`;

// 팝업 스타일드 컴포넌트
const PopupContainer = styled.div`
  width: 500px;
  height: 750px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 배경보다 앞에 위치 */
  padding: 20px 40px;
`;

// 팝업창 상단
const PopupTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 7%;
`;

const PopupTopCloseBtn = styled.button`
  border: none;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
`;

const EmailLost = ({ onClose }) => {
  return (
    <>
      <Overlay />
      <PopupContainer>
        <PopupTop>
          <PopupTopCloseBtn onClick={onClose}>X</PopupTopCloseBtn>
        </PopupTop>
        <h2>팝업 내용</h2>
        <p>팝업 내용을 여기에 작성하세요.</p>
      </PopupContainer>
    </>
  );
};

export default EmailLost;
