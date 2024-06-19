import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonStyle = styled.button`
    height: 50px;
    width: 180px;
    margin-bottom: 30px;
    background-color: rgba(106, 156, 253, 0.5);
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 400;
    &:hover {
    background-color: rgba(106, 156, 253, 0.3);
    }
`;

const Button = ({ text, onClick }) => {
    return (
        <ButtonContainer>
            <ButtonStyle type="submit" onClick={onClick}>
                {text}
            </ButtonStyle>
        </ButtonContainer>
    )
}

export default Button;