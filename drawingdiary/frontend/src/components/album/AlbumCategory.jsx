import React from "react";
import styled from "styled-components";
import { useCategory } from "./CategoryList";

const CategoryStyle = styled.select`
    width: 220px;
    height: 50px;
    margin: 0px 50px 0px 20px;
    padding-left: 20px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    align-items: center;
`;

const AlbumCategory = () => {
    const { categoryList } = useCategory();
    return (
        <div>
            <text style={{fontSize: '18px'}}>앨범에 추가</text>
            <CategoryStyle>
                {categoryList.map( (keyword) => (
                    <option key={keyword} value={keyword}>
                        {keyword}
                    </option>
                ))}
            </CategoryStyle>
        </div>
    );
};

export default AlbumCategory;