import React, { useState } from "react";
import styled from "styled-components";
import { useCategory } from "./CategoryList";
import { TrashButton } from "../button/DeleteButton";
import Modal from "./Modal";

const AlbumContainer = styled.div`
    width: 1190px;
    height: 290px;
    margin: 10px 0 30px 120px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ScrollSection = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
`;

const PictureContainer = styled.div`
    min-width: 210px;
    height: 250px;
    margin: 8px;
    border: 1px solid #8C8C8C;
    border-radius: 10px;
    display: flex;
    justify-content: center;
`;

const DateText = styled.text`
    font-size: 20px;
    font-weight: bold;
`;

const CategoryName = styled.text`
    font-size: 25px;
    font-weight: bold;
    margin-left: 130px;
`;


const AlbumBox = () => {
    const { categoryList, removeCategory } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const handleDeleteClick = (category) => {
        setIsModalOpen(true);
        setCurrentCategory(category);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
        removeCategory(currentCategory);
    };
    
    // 임의의 앨범 아이템 배열 생성 (1월 1일부터 1월 10일까지)
    // const albumItems = Array.from({ length: 10 }, (_, index) => ({
    //     date: `1월 ${index + 1}일`,
    // }));
    
    const albumItemEmpty = [];
    
    return (
        <div>
            {categoryList.length > 0 ? (
                categoryList.map((category) => (
                    <div key={category}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                marginRight: '80px',
                            }}>
                            <CategoryName>{category}</CategoryName>
                            <TrashButton onClick={() => handleDeleteClick(category)}/>

                        </div>

                        <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmDelete}
                        />

                        <AlbumContainer>
                            {albumItemEmpty.length > 0 ? (
                                <ScrollSection>
                                    {albumItemEmpty.map((item, index) => (
                                        <PictureContainer key={index}>
                                            <DateText>{item.date}</DateText>
                                        </PictureContainer>
                                    ))}
                                </ScrollSection>
                            ) : (
                                <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    color: '#b3b3b3'
                                }}>
                                    앨범에 일기를 추가하려면 먼저 작성하세요.
                                </div>
                            )}
                        </AlbumContainer>
                    </div>
                ))
            ) : (
                <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '290px', // AlbumContainer와 동일한 높이를 유지
                    color: '#b3b3b3',
                    margin: '10px -20px 30px 120px', // AlbumContainer와 동일한 마진을 유지
                }}>
                    {/* 이 부분은 나중에 삭제하고 사용자가 생성한 카테고리가 없으면 모두 기본으로 되어야 함 */}
                    사용 가능한 카테고리가 없습니다. 
                </div>
            )}
        </div>
    );
};

export default AlbumBox;
