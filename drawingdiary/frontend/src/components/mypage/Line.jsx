import styled, { css } from "styled-components";

const LineBox = styled.div`
  width: 420px;
  display: flex;
  border-bottom: 1px solid rgba(163, 163, 163, 0.3);
  padding: 5px 0;
  ${(props) =>
    !props.hasBorder &&
    css`
      border-bottom: none;
    `}
`;

const LineIcon = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LineText = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;

function Line({ icon: Icon, text, hasBorder }) {
  return (
    <LineBox hasBorder={hasBorder}>
      <LineIcon>
        <Icon size={24} color="#727272" />
      </LineIcon>
      <LineText> {text}</LineText>
    </LineBox>
  );
}

export default Line;
