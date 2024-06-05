import styled from "styled-components";


const Btn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 44px;
  margin: 5px 0 5px 10px;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  border: 0.0625rem solid rgba(106, 156, 253, 0.5);
  color: #0d0d0d;
  &:hover {
    background-color: rgba(106, 156, 253, 0.3);
    border: none;
    width: 58px;
    height: 46px;
  }
`;

function LoginBtn({ text, onClick }) {
  return (
    <Btn onClick={onClick}>
      {text}
    </Btn>
  );
}

export default LoginBtn;
