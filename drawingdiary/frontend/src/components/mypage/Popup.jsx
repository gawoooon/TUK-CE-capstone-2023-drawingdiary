import styled from "styled-components";

const PopupBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

function Popup({ onClose }) {
  return (
    <PopupBox>
      <CloseButton onClick={onClose}>X</CloseButton>
    </PopupBox>
  );
}

export default Popup;
