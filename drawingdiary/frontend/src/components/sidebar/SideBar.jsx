import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoMdLogIn  } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { SlGraph } from "react-icons/sl";

const SideBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 500ms ease-out;
`;

const SideBarHeader = styled.div`
  padding: 50px 40px 25px 20px;
  margin-bottom: 40px; // 하단 여백 추가
  display: flex;
  align-items: center;
`;

const SideBarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 250px;
`;

const MenuItem = styled(Link)`
  width: 82%;
  display: flex;
  align-items: center;
  padding: 9px;
  color: #333;
  text-decoration: none;
  font-size: 15px;

  &:hover {
    border-radius: 10px;
    background-color: rgba(227, 227, 227, 0.7);
  }
`;

const MenuItemText = styled.span`
  margin-left: 30px;
  padding-top: 6px;
  white-space: nowrap;
  min-height: 20px;
`;

const ProfileSection = styled(Link)`
  width: 82%;
  padding: 9px;
  margin: 0 0 25px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  text-decoration: none;
  color: #333;

  &:hover {
    border-radius: 10px;
    background-color: rgba(227, 227, 227, 0.7);
  }
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  margin-left: 70px;
`;

const SideBar = ({ isOpen}) => {

  const setName = localStorage.getItem("setName");
  const setProfileImg = localStorage.getItem("setProfileImage");

  return (
    <SideBarStyle isOpen={isOpen}>
      <SideBarHeader>
        <MenuItemText>감성 일기</MenuItemText>
      </SideBarHeader>
      <SideBarMenu>
        <MenuItem to="/">
          <LuCalendarDays size={20} color="#3d3d3d" alt="Home" />
          <MenuItemText>캘린더</MenuItemText>
        </MenuItem>
        <MenuItem to="/album">
          <BiSolidPhotoAlbum size={20} color="#3d3d3d" alt="Album" />
          <MenuItemText>앨범</MenuItemText>
        </MenuItem>
        <MenuItem to="/stats">
          <SlGraph size={20} color="#3d3d3d" alt="Statics" />
          <MenuItemText>분석</MenuItemText>
        </MenuItem>
        <MenuItem to="/login">
          <IoMdLogIn size={20} color="#3d3d3d" alt="Login" />
          <MenuItemText>로그인</MenuItemText>
        </MenuItem>
      </SideBarMenu>

      <ProfileSection to="/my">
        {setProfileImg !== "null" && setProfileImg !== null ? (
          <ProfileImg src={setProfileImg} alt="profile" />
        ) : (
          <ProfileImg src="/user.png" alt="profile" />
        )}
        <ProfileName>{setName}</ProfileName>
      </ProfileSection>
    </SideBarStyle>
  );
};

export default SideBar;
