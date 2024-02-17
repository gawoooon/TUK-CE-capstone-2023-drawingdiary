import styled from "styled-components";
import Background from "../components/Background";
import AlbumBox from "../components/album/AlbumBox";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import Button from "../components/button/Button";
import { useState } from "react";
import AddCategory from "../components/album/AddCategory";
import { CategoryProvider } from "../components/album/CategoryList";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 70px);
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const AddAlbumContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-right: 70px;
  display: flex;
  justify-content: flex-end;
`;

const AlbumPage = () => {
  const [isAddCategoryVisible, setAddCategoryVisible] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const handleAddCategoryButtonClick = () => {
    setIsAddCategoryOpen(true);
  };

  const handleClose = () => {
    setIsAddCategoryOpen(false);
  };

  return (
    <CategoryProvider>
      <Background>
        <Container>
          <ShortSidebar/>
          <AddAlbumContainer>
            <Button text="앨범 추가" onClick={handleAddCategoryButtonClick}></Button>
            {isAddCategoryVisible && <AddCategory onClick={handleClose} />}
            <AddCategory
              isOpen={isAddCategoryOpen}
              onclose={handleClose}
            />
          </AddAlbumContainer>
          <AlbumBox  />
        </Container>
      </Background>
    </CategoryProvider>
  );
}

export default AlbumPage;
