import styled from "styled-components";
import { Link } from "react-router-dom";

const SideBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.3);
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
    border-left: 5px solid #d9d9d9;
  }
`;

const MenuItemText = styled.span`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
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

const SideBar = ({ isOpen, userName, userEmail }) => {
  const handleLogout = () => {
    localStorage.removeItem("selectedColor");
    localStorage.removeItem("setName");
    localStorage.removeItem("setEmail");
    localStorage.removeItem("setBirth");

    // 로그아웃 기능 추가
  };

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
          <img src="sign-out.png" alt="Log out" />
          <MenuItemText isOpen={isOpen} onClick={handleLogout}>
            로그아웃
          </MenuItemText>
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
