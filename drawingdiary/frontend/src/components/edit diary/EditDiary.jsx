import React, { useState } from "react";
import styled from "styled-components";

const WriteArea = styled.textarea`
    width: 680px;
    height: 20px;
    padding: 10px;
    margin-top: 2px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    outline: none;
    resize: none;
`;

const EditDiary = ( { onDiaryTextChange }) => {
    // const [text, setText] = useState('');
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
