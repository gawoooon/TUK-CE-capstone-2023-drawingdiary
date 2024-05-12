import React, { useState } from "react";
import styled from "styled-components";

const WriteArea = styled.textarea`
    width: 278px;
    height: 350px;
    padding: 10px;
    margin-top: 14px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    outline: none;
    resize: none;
`;

const EditDiary = ( { onDiaryTextChange }) => {
    const [diaryText, setDiaryText] = useState('');

    const handleDiaryTextChange = (e) => {
        const newText = e.target.value;
        setDiaryText(newText);
        onDiaryTextChange(newText);
    }
    
    return (
        <div>
            <WriteArea
                value={diaryText}
                placeholder="30자 이상 작성해주세요."
                onChange={(e) => {
                    setDiaryText(e.target.value);
                    handleDiaryTextChange(e);
                }}
            />
        </div>
    );
};

export default EditDiary;
