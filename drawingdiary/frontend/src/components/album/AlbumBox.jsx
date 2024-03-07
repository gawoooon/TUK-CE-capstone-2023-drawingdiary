import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "./CategoryList";
import { TrashButton } from "../button/DeleteButton";
import Modal from "./Modal";
import axios from "axios";

const AlbumContainer = styled.div`
    width: 1190px;
    height: 260px;
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
    height: 230px;
    margin: 8px;
    border: none;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        margin-top: 10px;
    }
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


const AlbumBox = ({ onErrorMessage }) => {
    const {  removeCategory } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [data, setData] = useState([]);

    const accessToken = localStorage.getItem('accessToken');

    const handleDeleteClick = (category) => {
        setIsModalOpen(true);
        setCurrentCategory(category);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        removeCategory(currentCategory, onErrorMessage);
    };

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/album/all', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                const newData = response.data.map(entry => ({
                    name: entry.name,
                    images: entry.images.map(img => ({
                        date: img.date,
                        imageFile: img.imageFile
                    })).sort((a, b) => new Date(a.date) - new Date(b.date))
                }));
                setData(newData);
                console.log("데이터: ", data);
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchAlbum();
    }, [accessToken, data]);
    
    return (
        <div>
            {data.map((categoryEntry) => (
                <div key={categoryEntry.name}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            marginRight: '80px',
                        }}>
                        <CategoryName>{categoryEntry.name}</CategoryName>
                        <TrashButton onClick={() => handleDeleteClick(categoryEntry.name)}/>

                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmDelete}
                    />

                    <AlbumContainer>
                        {categoryEntry.images.length > 0 ? (
                            <ScrollSection>
                                {categoryEntry.images.map((item, index) => (
                                    <PictureContainer key={index}>
                                        <DateText>{item.date}</DateText>
                                        <img src={item.imageFile} alt="Album" />
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
            ))}
        </div>
    );
};

export default AlbumBox;
