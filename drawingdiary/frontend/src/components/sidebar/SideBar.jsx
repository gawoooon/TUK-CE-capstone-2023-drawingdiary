import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import axios from "axios";

const SideBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #f9f9f9;
  box-sizing: border-box;
`;

const SideBarHeader = styled.div`
  padding: 50px 40px 25px 20px;
  margin-bottom: 40px; // 하단 여백 추가
  display: flex;
  align-items: center;
`;

const SideBarLogo = styled.img`
  height: 40px; // 로고 이미지 높이 설정
  padding-right: 15px;
`;

const SideBarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 250px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 9px;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  
  img {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    transition: background 0.3s, box-shadow 0.3s;
  }


  &:hover {
    background: ${({ isOpen }) => isOpen ? '#ececec' : 'transparent'};
    width: ${({ isOpen }) => isOpen ? '245px' : 'auto'};
    border-left: ${({ isOpen }) => isOpen ? '5px solid rgba(255, 184, 208, 0.58)' : 'none'};
  }
`;

const MenuItemText = styled.span`
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: opacity 700ms ease-out;
  margin-left: 16px;
  padding-top: 6px;
  white-space: nowrap;
  min-height: 20px;
`;

const ProfileSection = styled.div`
  padding: 25px 0 25px 25px;
  border-top: 1px solid #ddd; // 상단에 경계선 추가
  min-height: 100px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%; // 이미지를 원형으로 만듭니다.
  margin-bottom: 20px; // 프로필 이름과의 간격 설정
`;

const ProfileName = styled.div`
  color: #333;
  font-size: 16px; // 프로필 이름의 폰트 크기 설정
`;

const ProfileEmail = styled.div`
  color: #333;
  font-size: 13px; // 프로필 이름의 폰트 크기 설정
`;


const SideBar = ({ isOpen }) => {

  const { memberID } = useAuth();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const fetchUserName = useCallback(async () => {
    if (memberID) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8080/api/get-member', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setUserName(response.data.name);
        setUserEmail(response.data.email);

      } catch (error) {
        console.log("사용자의 이름을 불러오는 중 에러 발생: ", error);
      }
    }
  }, [memberID]);

  useEffect(() => {
    fetchUserName();
  }, [memberID, fetchUserName]);


  return (
    <SideBarStyle>
      <SideBarHeader>
        <SideBarLogo src="logo.png" alt="Logo" />
        <MenuItemText isOpen={isOpen}>감성 일기</MenuItemText>
      </SideBarHeader>
      <SideBarMenu>
        <MenuItem to="/calendar" isOpen={isOpen}>
          <img src="schedule.png" alt="Home" />
          <MenuItemText isOpen={isOpen}>캘린더</MenuItemText>
        </MenuItem>
        <MenuItem to="/album" isOpen={isOpen}>
          <img src="photo-album.png" alt="Album" />
          <MenuItemText isOpen={isOpen}>앨범</MenuItemText>
        </MenuItem>
        <MenuItem to="/stats" isOpen={isOpen}>
          <img src="graph.png" alt="Statics" />
          <MenuItemText isOpen={isOpen}>분석</MenuItemText>
        </MenuItem>
        <MenuItem to="/my" isOpen={isOpen}>
          <img src="my-page.png" alt="MyPage" />
          <MenuItemText isOpen={isOpen}>마이페이지</MenuItemText>
        </MenuItem>
        <MenuItem to="/" isOpen={isOpen}>
          <img src="sign-out.png" alt="Log out"/>
          <MenuItemText isOpen={isOpen}>로그아웃</MenuItemText>
        </MenuItem>
      </SideBarMenu>

      <ProfileSection>
        <ProfileImage src="user.png" alt="User" />
        <MenuItemText isOpen={isOpen}>
          <ProfileName>{userName}</ProfileName>
        </MenuItemText>
        <MenuItemText isOpen={isOpen}>
          <ProfileEmail>{userEmail}</ProfileEmail>
        </MenuItemText>
      </ProfileSection>
    </SideBarStyle>
  );
};

export default SideBar;