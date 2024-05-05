import styled, { css } from "styled-components";

const paddingForTitle = css`
  padding: 10px 10px 0 10px;
`;

const PopupLineBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px 10px 10px;
  width: 100%;
  height: 45px;
  box-sizing: border-box;
  ${(props) => props.hasTitle && paddingForTitle}
`;

const PopupLineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
`;

const PopupLineInput = styled.input`
  width: 250px;
  height: 100%;
  outline: none;
  font-size: 13px;
  border: none;
  border-bottom: 1px solid rgba(56, 56, 56, 0.4);
`;

const PopupLineTitle = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 100%;
  font-size: 15px;
  font-weight: bold;
`;

const PopupLineBtnBox = styled.div`
  width: 70px;
  height: 100%;
`;

const PopupLineBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid rgba(106, 156, 253, 0.4);
  border-radius: 10px;
  cursor: pointer;
  color: black;
  font-size: 13px;
  text-align: center;
  outline: none;
`;

function PopupLine({ icon: Icon, text, placeholder, title }) {
  return (
    <PopupLineBox hasTitle={title ? true : false}>
      <PopupLineIcon>{Icon && <Icon size={28} />}</PopupLineIcon>
      {placeholder ? (
        <PopupLineInput placeholder={placeholder} />
      ) : (
        <PopupLineTitle>{title}</PopupLineTitle>
      )}
      <PopupLineBtnBox>
        {text && <PopupLineBtn> {text}</PopupLineBtn>}
      </PopupLineBtnBox>
    </PopupLineBox>
  );
}

export default PopupLine;
