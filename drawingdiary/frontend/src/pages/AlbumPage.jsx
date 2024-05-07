import styled from "styled-components";
import AlbumBox from "../components/album/AlbumBox";
import NavBar from "../components/sidebar/NavBar";
import Button from "../components/button/Button";
import { useState } from "react";
import AddCategory from "../components/album/AddCategory";
import { CategoryProvider } from "../components/album/CategoryList";
import Background2 from "../components/Background/index2";

const Container = styled.section`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  `;

const AlbumContainer = styled.section`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const AddAlbum = styled.div`
  position: sticky;
  display: flex;
  justify-content: end;
  margin-top: 20px;
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
          <AlbumContainer>
            <AlbumBox  onErrorMessage={handleErrorMessage}/>
          </AlbumContainer>
          <AddAlbum>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <Button text="앨범 추가" onClick={handleAddCategoryButtonClick}></Button>
            {isAddCategoryVisible && <AddCategory onClick={handleClose} />}
            <AddCategory
              isOpen={isAddCategoryVisible}
              onclose={handleClose}
              />
          </AddAlbum>
        </Container>
      </Background2>
    </CategoryProvider>
  );
}

export default AlbumPage;
