import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonStyle = styled.button`
    height: 50px;
    width: 250px;
    margin-bottom: 30px;
    background-color: rgba(106, 156, 253, 0.3);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-weight: bold;
`;


// const SaveSuccess = styled.text`
//     margin-right: 5px;
//     font-size: 15px;
//     color: #787878;
//     opacity: ${(props) => (props.show ? 1 : 0)};
//     transition: opacity 0.5 ease-in-out;
// `;

const Button = ({ text, onClick }) => {
    // const [showSuccess, setShowSuccess] = useState(false);
    
    // const handleButtonClick = () => {
    //     setShowSuccess(true);

    //     setTimeout(() => {
    //         setShowSuccess(false);
    //     }, 5000);
    // };

    return (
        <ButtonContainer>
            {/* <SaveSuccess show={showSuccess}>일기가 성공적으로 저장되었습니다!</SaveSuccess> */}
            <ButtonStyle type="submit" onClick={onClick}>
                {text}
            </ButtonStyle>
        </ButtonContainer>
    )
}

export default Button;