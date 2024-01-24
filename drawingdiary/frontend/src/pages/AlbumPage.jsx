import styled from "styled-components";
import Background from "../components/Background";
import AlbumBox from "../components/album/AlbumBox";
import ShortSidebar from "../components/sidebar/ShortSidebar";
import Button from "../components/button/Button";
import { useEffect, useState, useRef } from "react";
import AddCategory from "../components/album/AddCategory";
import { CategoryProvider, useCategory } from "../components/album/CategoryList";

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
  const { categoryList } = useCategory();
  const albumBoxRef = useRef(null);

  useEffect(() => {
      // 카테고리 리스트가 변경될 때 스크롤을 맨 아래로 이동
      if (albumBoxRef.current) {
          albumBoxRef.current.scrollTop = albumBoxRef.current.scrollHeight;
      }
  }, [categoryList]);

  const handleAddCategoryButtonClick = () => {
    setAddCategoryVisible(!isAddCategoryVisible);
  };

  return (
    <CategoryProvider>
      <Background>
        <Container>
          <ShortSidebar/>
          <AddAlbumContainer ref={albumBoxRef}>
            <Button text="앨범 추가" onClick={handleAddCategoryButtonClick}></Button>
            {isAddCategoryVisible && <AddCategory />}
          </AddAlbumContainer>
          <AlbumBox />
        </Container>
      </Background>
    </CategoryProvider>
  );
}

export default AlbumPage;
