import { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const jumpAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`;

const Btn = styled.link`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  background-color: #7fa5ffc5;
  box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.1);
  color: black;
  &:hover {
    animation: ${(props) =>
    props.animate
      ? css`
          ${jumpAnimation} 0.5s ease
        `
      : "none"};
  }
`;

function LoginBtn({ text, onClick }) {
  const animateLogin = true;
  return <Btn onClick={onClick} animate={animateLogin}>{text}</Btn>;
}

export default LoginBtn;
