import React from "react";
import styled from "styled-components";

const CategoryStyle = styled.select`
    width: 220px;
    height: 50px;
    margin: 0px 50px 0px 20px;
    padding-left: 100px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    align-items: center;
`;

const AlbumCategory = () => {
    return (
        <div>
            <text style={{fontSize: '18px'}}>앨범에 추가</text>
            <CategoryStyle
                className="album"
                id="album">
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
            </CategoryStyle>
        </div>
    );
};

export default AlbumCategory;