import styled from "styled-components";


const Btn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 48px;
  margin: 5px 0 5px 20px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: rgba(106, 156, 253, 0.5);
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.1);
  color: #0d0d0d;
  &:hover {
    background-color: rgba(106, 156, 253, 0.3);
  }
`;

function LoginBtn({ text, onClick }) {
  const animateLogin = true;
  return (
    <Btn onClick={onClick} animate={animateLogin}>
      {text}
    </Btn>
  );
}

export default LoginBtn;
