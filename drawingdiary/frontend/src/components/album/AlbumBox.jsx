import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCategory } from "./CategoryList";
import { TrashButton } from "../button/DeleteButton";
import Modal from "./Modal";
import axios from "axios";
import { useAuth } from "../../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    overflow-y: hidden;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    
    :hover {
        img {
            transform: scale(1.05);
        }
    }
`;

const DateText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    padding-top: 5px;
    border-radius: 10px;

    img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        margin: 10px 5px 5px 5px;
        transition: transform 0.2s ease;
    }
`;

const CategoryName = styled.div`
    font-size: 25px;
    font-weight: bold;
    margin-left: 130px;
`;

const AlbumBox = ({ onErrorMessage }) => {
    const {  removeCategory } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const { memberID } = useAuth();
    const accessToken = localStorage.getItem('accessToken');
    
    const fetchAlbum = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/album/all', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log("response: ", response);
            const newData = response.data.map(entry => ({
                albumID: entry.albumID,
                name: entry.name,
                images: entry.images.map(img => ({
                    date: img.date,
                    imageFile: img.imageFile
                })).sort((a, b) => new Date(a.date) - new Date(b.date))
            }));
            setData(newData);
        } catch (error) {
            console.log("error: ", error);
        }
    };

    const showDetails = async (selectedDate) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diary/${selectedDate}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const dataArray = response.data;
            console.log("dataArray: ", dataArray);

            const diaryText = dataArray.text;
            const weather = dataArray.weather;
            const albumName = dataArray.albumName;
            const formattedDate = dataArray.date.split("-");
            const currentYear = formattedDate[0];
            const month = formattedDate[1];
            const day = formattedDate[2];
            const image = dataArray.imageURL;
            const comment = dataArray.comment;
            const style = dataArray.styleName;
            const sentiment = dataArray.sentiment;

            navigate(`/showDiary/${memberID}/${currentYear}${month}${day}`, {
                state: { date: { currentYear, month, day }, diaryData: { weather, albumName, diaryText, style, image, comment, sentiment} },
            });
            

        } catch(error) {
            console.log("error: ", error);
        }
    };

    const handleShowDetails = (selectedDate) => {
        showDetails(selectedDate);
    }

    const handleDeleteClick = (category) => {
        setIsModalOpen(true);
        setCurrentCategory(category);
        console.log("category: ", category);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
        removeCategory(currentCategory, onErrorMessage);
    };

    useEffect(() => {
        fetchAlbum();
    }, [fetchAlbum]);
    
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
                        <TrashButton onClick={() => handleDeleteClick(categoryEntry.albumID)}/>

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
                                    <PictureContainer key={index} onClick={() => handleShowDetails(item.date)}>
                                        <DateText>
                                            {item.date}
                                            <img src={item.imageFile} alt="Album" />
                                        </DateText>
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
