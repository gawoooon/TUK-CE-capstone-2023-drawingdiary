import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCategory } from "./CategoryList";
import axios from "axios";

const CategoryStyle = styled.select`
  width: 220px;
  height: 50px;
  margin: 10px 50px 10px 20px;
  padding-left: 20px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const AlbumCategory = ({ onSelectAlbum }) => {
  const { categoryList } = useCategory();
  const accessToken = localStorage.getItem('accessToken');
  const [selectedAlbumID, setSelectedAlbumID] = useState(0);

  const fetchBaseCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/album/list", {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const baseIndex = response.data.findIndex(item => item.albumName === "기본");
      if(baseIndex !== -1) {
        const baseID = response.data[baseIndex].albumID;
        setSelectedAlbumID(baseID);
        console.log("selectedAlbumID: ", baseID);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if(selectedAlbumID === 0) {
      fetchBaseCategory();
    }
    onSelectAlbum(selectedAlbumID);
  }, [selectedAlbumID, fetchBaseCategory]);

  const handleAlbumChange = (event) => {
    // 선택한 앨범의 ID를 상태에 저장
    setSelectedAlbumID(event.target.value);
    console.log("target", event.target.value);
  };

  return (
    <div>
      <text style={{ fontSize: "18px" }}>앨범에 추가</text>
      <CategoryStyle onChange={handleAlbumChange} value={selectedAlbumID}>
        {categoryList.map((keyword) => (
          <option key={keyword.memberID} value={keyword.albumID}>
            {keyword.albumName}
          </option>
        ))}
      </CategoryStyle>
    </div>
  );
};

export default AlbumCategory;
