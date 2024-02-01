import React from "react";
import styled from "styled-components";


const ButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const DeleteButton = ({onClick}) => {
    return(
        <div>
            <ButtonStyle onClick={onClick} src="/trash.png" alt="delete"/>
        </div>
    );
};

export default DeleteButton;