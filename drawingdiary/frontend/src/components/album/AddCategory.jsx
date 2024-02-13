import React, { useState } from "react";
import styled from "styled-components";
import SmallButton from "../button/SmallButton";
import { useCategory } from "./CategoryList";

const AddContainer = styled.div`
    width: 250px;
    height: 140px;
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
    position: absolute;
    display: flex;
    justify-content: flex-end;
`;

const MessageContainer = styled.text`
  font-size: 10px;
  color: #8c8c8c;
  position: absolute;
`;


const AddCategory = ({ categoryList }) => {
    const [newCategory, setNewCategory] = useState("");
    const { addCategory } = useCategory();
    const [showMessage, setShowMessage] = useState(false);

    const handleAddButtonClick = () => {
        addCategory(newCategory);
        setNewCategory("");
        // 메시지 표시
        setShowMessage(true);
        // 2초 후에 메시지 감추기
        setTimeout(() => {
        setShowMessage(false);
        }, 2000);
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {showMessage && (
                        <MessageContainer>
                        새로운 카테고리가 추가되었습니다.
                        </MessageContainer>
                        )}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginLeft: '-10px', marginBottom: '5px', marginTop: '10px'}}>
                        <SmallButton text="추가" onClick={handleAddButtonClick} />
                    </div>
                </AddContainer>
            </AddCategoryContainer>
        </div>
    );
};

export default AddCategory;