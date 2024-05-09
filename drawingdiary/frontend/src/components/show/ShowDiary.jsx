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

const ShowDiary = ( { onDiaryTextChange, showText }) => {
    
    const [diaryText, setDiaryText] = useState(showText);
    console.log("showText: ", showText);

    const handleDiaryTextChange = (e) => {
        console.log("여기는 show diary");
        const newText = e.target.value;
        setDiaryText(newText);
        onDiaryTextChange(newText);
        console.log("바뀐 텍스트: ", newText)
    }
    
    return (
        <div>
            <WriteArea
                value={diaryText}
                placeholder="여기에 일기를 작성해주세요."
                onChange={(e) => {
                    setDiaryText(e.target.value);
                    handleDiaryTextChange(e);
                }}
            />
        </div>
    );
};

export default ShowDiary;
