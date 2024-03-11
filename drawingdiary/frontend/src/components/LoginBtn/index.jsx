import { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const jumpAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`;

const Btn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  background-color: #acc5ff;
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
