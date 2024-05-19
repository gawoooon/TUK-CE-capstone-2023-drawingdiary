import styled from "styled-components";
import AlbumBox from "../components/album/AlbumBox";
import NavBar from "../components/sidebar/NavBar";
import Button from "../components/button/Button";
import { useState } from "react";
import AddCategory from "../components/album/AddCategory";
import { CategoryProvider } from "../components/album/CategoryList";

const Container = styled.body`
  width: 100%;
  height: 100vh;
  margin-right: 120px;
  display: flex;
  flex-direction: row;
  `;

const RightSection = styled.section`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AlbumContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 4px;
  }
`;

const AddAlbum = styled.div`
  position: sticky;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  margin: 0 30px 30px 0;
  color: #af0000;
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
        <Container>
          <NavBar/>
          <RightSection>
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
          </RightSection>
        </Container>
    </CategoryProvider>
  );
}

export default AlbumPage;
