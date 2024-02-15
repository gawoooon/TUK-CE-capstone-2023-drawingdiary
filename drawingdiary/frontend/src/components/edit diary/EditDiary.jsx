import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WriteContatiner = styled.div`
    width: 760px;
    height: 400px;
    z-index: 1;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px 10px 10px 10px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    flex-direction: column;
    h3 {
        margin-top: 5px;
        margin-left: 30px;
        margin-bottom: 10px;
    }
`;

const WriteArea = styled.textarea`
    width: 680px;
    height: 300px;
    background-color: rgba(106, 156, 253, 0.2);
    margin: 0 auto;
    padding: 20px;
    border: none;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 18px;
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

    // useEffect(() => {
    //     // 텍스트 변경 시 상위 컴포넌트로 상태 전달
    //     onDiaryTextChange(text.length >= 30); // 30자 이상인지 boolean 값으로 전달
    // }, [text, onDiaryTextChange]);

    
    return (
        <WriteContatiner>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginRight: '30px'
                }}>
                <h3>일기 작성</h3>
                
            </div>
            <WriteArea
                value={diaryText}
                onChange={(e) => {
                    setDiaryText(e.target.value);
                    handleDiaryTextChange(e);
                }}
            ></WriteArea>
                
        </WriteContatiner>
    );
};

export default EditDiary;