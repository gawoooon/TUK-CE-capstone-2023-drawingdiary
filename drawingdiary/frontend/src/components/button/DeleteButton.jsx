import React from "react";
import styled from "styled-components";


const TrashButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const RemoveButtonStyle = styled.button`
    height: 50px;
    width: 250px;
    margin-bottom: 30px;
    background-color: rgba(255, 184, 208, 0.5);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const TrashButton = ({onClick}) => {
    return(
        <div>
            <TrashButtonStyle onClick={onClick} src="/trash.png" alt="delete"/>
        </div>
    );
};

const RemoveButton = ({ text, onClick }) => {
    return(
        <div>
            <RemoveButtonStyle onClick={onClick}>
                {text}
            </RemoveButtonStyle>
        </div>
    );
};

export { TrashButton, RemoveButton } ;