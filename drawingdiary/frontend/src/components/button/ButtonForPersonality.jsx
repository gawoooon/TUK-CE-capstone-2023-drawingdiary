import styled from "styled-components";
import React, { useState, useEffect } from "react";

const PersonalButton = styled.button`
    height: 45px;
    width: 113px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 5px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    background-color: ${({ isSelected }) => isSelected ? '#646FD4B3' : 'transparent'};
    color: ${({ isSelected }) => isSelected ? 'white' : 'black'};
`;

const ButtonForPersonality = ( {keyword, onSelect, selected, children} ) => {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
    }, [isSelected]); // isSelected 값이 변할 때마다 useEffect 실행

    const handleClick = () => {
        if(selected === keyword) {
            onSelect(null)
        } else {
            onSelect(keyword);
        }
        setIsSelected(!isSelected); // 현재 상태의 반대 값으로 설정

    };

    return(
        <PersonalButton isSelected={selected === keyword} onClick={handleClick}>
            {children}
        </PersonalButton>
    );
};

export default ButtonForPersonality;

