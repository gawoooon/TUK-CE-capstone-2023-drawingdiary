import React, { useEffect, useState } from "react";
import styled from "styled-components";

// const WriteContatiner = styled.div`
//     width: 760px;
//     height: 50px;
//     z-index: 1;
//     margin-top: 10px;
//     margin-bottom: 10px;
//     padding: 5px 10px 10px 10px;
//     background-color: rgba(255, 255, 255, 0.3);
//     border-radius: 30px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     h3 {
//         margin-top: 5px;
//         margin-left: 30px;
//         margin-bottom: 10px;
//     }
// `;

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
