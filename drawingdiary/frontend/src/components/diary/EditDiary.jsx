import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WriteArea = styled.textarea`
    width: 378px;
    height: 150px;
    padding: 10px;
    margin-top: 14px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    outline: none;
    resize: none;
    &::placeholder {
        color: black;
    }
`;

const DetailsContainer = styled.div`
    width: 390px;
    height: 210px;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    span {
        font-size: 12px;
        margin: 5px 0;
    }
`;

const Content = styled.input`
    height: 40px;
    width: 390px;
    padding-left: 5px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    outline: none;
    &::placeholder {
        color: black;
        font-weight: 400;
    }
`;

const ToggleContent = styled.select`
    height: 40px;
    width: 394px;
    padding-left: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 10px;
`;

const EditDiary = ({ onDiaryTextChange }) => {
    const [basicText, setBasicText] = useState('');
    const [location, setLocation] = useState('');
    const [season, setSeason] = useState('');
    const [weather, setWeather] = useState('');

    
    const updateDiaryText = () => {
        const details = [];
        if (location) details.push(`location: ${location}`);
        if (season) details.push(`season: ${season}`);
        if (weather) details.push(`weather: ${weather}`);
        
        const formattedText = `${basicText}${details.length > 0 ? ", " + details.join(", ") : ""}`;
        onDiaryTextChange(formattedText);
    };

    useEffect(() => {
        updateDiaryText();
    }, [location, season, weather]);
    
    const handleDiaryTextChange = (e) => {
        setBasicText(e.target.value);
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <div>
            <WriteArea
                value={basicText}
                placeholder="30자 이상 작성해주세요."
                onChange={handleDiaryTextChange}
                onBlur={updateDiaryText}
            />

            <DetailsContainer>
                <span>아래사항을 추가적으로 적으면 더 정확하게 이미지를 구현할 수 있어요.</span>
                <Content
                    value={location}
                    placeholder="장소를 적어주세요."
                    onChange={handleChange(setLocation)}
                />

                <ToggleContent
                    value={season}
                    onChange={handleChange(setSeason)}
                >
                    <option value="" disabled style={{ color: 'grey'}}>계절을 선택하세요.</option>
                    <option value="spring">봄</option>
                    <option value="summer">여름</option>
                    <option value="fall">가을</option>
                    <option value="winter">겨울</option>
                </ToggleContent>

                <ToggleContent
                    value={weather}
                    onChange={handleChange(setWeather)}
                >
                    <option value="" disabled style={{ color: 'grey'}}>날씨를 선택하세요.</option>
                    <option value="clear">맑음</option>
                    <option value="rain">비</option>
                    <option value="thunder">천둥</option>
                    <option value="wind">바람</option>
                    <option value="cloudy">흐림</option>
                    <option value="snow">눈</option>
                </ToggleContent>
            </DetailsContainer>
        </div>
    );
};

export default EditDiary;
