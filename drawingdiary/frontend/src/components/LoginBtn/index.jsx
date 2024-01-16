import styled from "styled-components";

const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: #c4d4f9;
  box-shadow: 0 5px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  font-size: 20px;
  font-weight: 800;
  color: #989898;
`;

function LoginBar({ text }) {
  return <Btn>{text}</Btn>;
}

export default LoginBar;
