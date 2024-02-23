import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import axiosInstance from "../../axios/axisoInstance";
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
  /* padding-left: 20px; */
  box-sizing: border-box;
`;

const SideBarHeader = styled.div`
  padding: 0 20px; // 왼쪽 오른쪽 패딩 추가
  margin-bottom: 40px; // 하단 여백 추가
`;

const SideBarLogo = styled.img`
  height: 40px; // 로고 이미지 높이 설정
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
  padding: 12px;
  color: #333;
  text-decoration: none;
  
  img {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    transition: background 0.3s, box-shadow 0.3s;
  }

  span {
    display: ${({ isOpen }) => isOpen ? 'inline' : 'none'};
    margin-left: 16px;
    white-space: nowrap;
  }

  &:hover img {
    padding-left: 5px;
  }

  &:hover {
    background: ${({ isOpen }) => isOpen ? '#ececec' : 'transparent'};
    width: ${({ isOpen }) => isOpen ? '245px' : 'auto'};
    border-left: ${({ isOpen }) => isOpen ? '5px solid #ddd' : 'none'};
    border-radius: 10px;
  }
`;

const ProfileSection = styled.div`
  padding: 30px;
  margin-bottom: 20px;
  border-top: 1px solid #ddd; // 상단에 경계선 추가
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; // 이미지를 원형으로 만듭니다.
  margin-bottom: 10px; // 프로필 이름과의 간격 설정
`;

const ProfileName = styled.div`
  color: #333;
  font-size: 16px; // 프로필 이름의 폰트 크기 설정
`;


const SideBar = ({ isOpen }) => {

  const { memberID } = useAuth();
  const [userName, setUserName] = useState("");

  const fetchUserName = useCallback(async () => {
    if (memberID) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log("accessToken: ", accessToken);
        const response = await axios.get('http://localhost:8080/api/getMember', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response);

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
        {/* <SideBarLogo src="your-logo.png" alt="Your Logo" /> */}
      </SideBarHeader>
      <SideBarMenu>
        <MenuItem to="/calendar" isOpen={isOpen}>
          <img src="schedule.png" alt="Home" />
          {isOpen && <span>Home</span>}
        </MenuItem>
        <MenuItem to="/album" isOpen={isOpen}>
          <img src="photo-album.png" alt="Album" />
          {isOpen && <span>Album</span>}
        </MenuItem>
        <MenuItem to="/stats" isOpen={isOpen}>
          <img src="graph.png" alt="Statics" />
          {isOpen && <span>Analytics</span>}
        </MenuItem>
        <MenuItem to="/my" isOpen={isOpen}>
          <img src="my-page.png" alt="MyPage" />
          {isOpen && <span>My Page</span>}
        </MenuItem>
      </SideBarMenu>
      <ProfileSection>
        <ProfileImage src="user-profile.png" alt="User Profile" />
        {isOpen && <ProfileName>홍길동</ProfileName>}
      </ProfileSection>
    </SideBarStyle>
  );
};

export default SideBar;
