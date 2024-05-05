import styled from "styled-components";
import AlbumBox from "../components/album/AlbumBox";
import NavBar from "../components/sidebar/NavBar";
import Button from "../components/button/Button";
import { useState } from "react";
import AddCategory from "../components/album/AddCategory";
import { CategoryProvider } from "../components/album/CategoryList";
import Background2 from "../components/Background/index2";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
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
  position: sticky;
  margin-top: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: flex-end;
`;

const ErrorMessage = styled.div`
  margin-right: 250px;
  color: red;
`;

const AlbumPage = () => {
  const [isAddCategoryVisible, setAddCategoryVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCategoryButtonClick = () => {
    setAddCategoryVisible(true);
  };

  const handleClose = () => {
    setAddCategoryVisible(false);
    setErrorMessage("");
  };

  const handleErrorMessage = (message) => {
    setErrorMessage(message);
    
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }

  return (
    <CategoryProvider>
      <Background2>
        <Container>
          <NavBar/>
          <AlbumBox  onErrorMessage={handleErrorMessage}/>
        </Container>
        <AddAlbumContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button text="앨범 추가" onClick={handleAddCategoryButtonClick}></Button>
          {isAddCategoryVisible && <AddCategory onClick={handleClose} />}
          <AddCategory
            isOpen={isAddCategoryVisible}
            onclose={handleClose}
          />
        </AddAlbumContainer>
      </Background2>
    </CategoryProvider>
  );
}

export default AlbumPage;
