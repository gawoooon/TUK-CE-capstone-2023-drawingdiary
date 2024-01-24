import React, { useState } from "react";
import styled from "styled-components";
import SmallButton from "../button/SmallButton";
import { useCategory } from "./CategoryList";

const AddContainer = styled.div`
    width: 250px;
    height: 120px;
    border-radius: 10px;
    position: absolute;
    background-color: #FFF;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const AddItem = styled.input`
    width: 200px;
    height: 40px;
    margin: 10px 15px 10px 15px;
    padding-left: 10px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    outline: none;
    font-size: 15px;
`;

const AddCategoryContainer = styled.div`
    margin-top: 55px;
    position: relative;
    display: flex;
    justify-content: flex-end;
`;


const AddCategory = ({ categoryList }) => {
    const [newCategory, setNewCategory] = useState("");
    const { addCategory } = useCategory();

    const handleAddButtonClick = () => {
        addCategory(newCategory);
        setNewCategory("");
    };

    return(
        <div>
            <AddCategoryContainer>
                <AddContainer>
                    <AddItem
                        placeholder="앨범 이름을 입력하세요."
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)} 
                    />
                    <div style={{display: 'flex', justifyContent: 'center', marginLeft: '-10px', marginBottom: '10px'}}>
                        <SmallButton text="추가" onClick={handleAddButtonClick} />
                    </div>
                </AddContainer>
            </AddCategoryContainer>
        </div>
    );
};

export default AddCategory;