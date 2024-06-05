import axios from "axios";
import { React, useEffect, useState } from "react";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { SlGraph } from "react-icons/sl";
import { TbUserEdit } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../auth/context/AuthContext";

const SideBarStyle = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 260px;
    height: 100vh;
    background-color: #eeeeee;
    padding: 0 6px;
    z-index: 9999;
`;

const HeaderSection = styled.div`
    margin-top: 45px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 165px;
`;

const MenuItem = styled(Link)`
    width: 248px;
    height: 55px;
    padding: 15px 0 16px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    &:hover {
        border-radius: 10px;
        background-color: rgba(227, 227, 227, 0.7);
    }
`;

const MenuItemText = styled.div`
    margin-left: 20px;
    color: #0d0d0d;
    font-size: 1rem;
`;

const RecentSection = styled.section`
    margin-top: 70px;
    width: 100%;
    height: 174px;
    display: flex;
    flex-direction: column;
`;

const RecentList = styled.div`
    padding: 8px 16px;
    font-size: 1rem;
    color: #0d0d0d;
    text-align: left;
    &:hover {
        border-radius: 10px;
        background-color: rgba(227, 227, 227, 0.7);
    }
`;

const ProfileSection = styled(Link)`
    width: 100%;
    height: 54px;
    margin: 50px 0 30px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    
    &:hover {
        border-radius: 10px;
        background-color: rgba(227, 227, 227, 0.7);
    }
`;

const ProfileImg = styled.img`
    width: 48px;
    height: 48px;
    margin-left: 8px;
    border-radius: 50%;
    object-fit: cover;
`;

const ProfileName = styled.div`
    margin-left: 20px;
    font-size: 1rem;
    color: #0d0d0d;
`;

const Navbar = () => {

    const [loginState, setLoginState] = useState(false);

    const { logout, getToken } = useAuth();
    const accessToken = getToken();

    const setProfileImg = localStorage.getItem("setProfileImage");

    const diaryList = ["2024년 1월 1일", "2024년 1월 1일", "2024년 1월 1일", "2024년 1월 1일", "2024년 1월 1일"];

    useEffect(() => {
        const currentAccessToken = getToken();
        if (currentAccessToken) {
        setLoginState(true);
        } else {
        setLoginState(false);
        }
    }, [accessToken]);
    
    const handleLogout = () => {
        if(accessToken !== null || accessToken !== 'undefined' || accessToken !== '') {
        axios.post('http://localhost:8080/api/logout', null, {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        }).then(() => {
            logout();
            setLoginState(false);
            alert("로그아웃 되었습니다!")
        }).catch((error) => {
            console.log(error)
        });   
        }
    };


    return (
        <SideBarStyle>
        <HeaderSection>
            <MenuItem to="/">
            <LuCalendarDays size={20} color="#3d3d3d" alt="Album" style={{margin: '1px 0'}}/>
            <MenuItemText>캘린더</MenuItemText>
            </MenuItem>
            <MenuItem to="/album">
            <BiSolidPhotoAlbum size={20} color="#3d3d3d" alt="Album" style={{margin: '1px 0'}}/>
            <MenuItemText>앨범</MenuItemText>
            </MenuItem>
            <MenuItem to="/stats">
            <SlGraph size={20} color="#3d3d3d" alt="Statics" style={{margin: '1px 0'}}/>
            <MenuItemText>분석</MenuItemText>
            </MenuItem>
            {loginState ? (
            <MenuItem to="/login" onClick={handleLogout}>
                <IoMdLogOut size={20} color="#3d3d3d" alt="Logout" style={{margin: '1px 0'}}/>
                <MenuItemText>로그아웃</MenuItemText>
            </MenuItem>
            ) : (
            <MenuItem to="/login">
                <IoMdLogIn size={20} color="#3d3d3d" alt="Login" style={{margin: '1px 0'}}/>
                <MenuItemText>로그인</MenuItemText>
            </MenuItem>
            )}
        </HeaderSection>

        <RecentSection>
            {diaryList.length > 0 ? (
            diaryList.map((date, index) => (
                <RecentList key={index}>
                {date}
                </RecentList>
            ))
            ) : (
            <RecentList>
                no recent data.
            </RecentList>
            )}
        </RecentSection>

        <ProfileSection to="/my">
            {setProfileImg !== "null" && setProfileImg !== null ? (
            <ProfileImg src={setProfileImg} alt="profile" />
            ) : (
            <TbUserEdit 
                size={30} 
                color='#3d3d3d' 
                alt='edit' />
            )}
            {loginState ? (
            <ProfileName style={{fontSize:'0.9375rem'}}>{localStorage.getItem('setName')}</ProfileName>
            ) : (
            <ProfileName style={{fontSize:'0.75rem'}}>{"로그인을 해주세요."}</ProfileName>
            )}
        </ProfileSection>
        </SideBarStyle>
    );
};

export default Navbar;
