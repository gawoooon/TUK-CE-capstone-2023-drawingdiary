import React, { useState } from "react";
import styled from "styled-components";
import { TbUserEdit } from "react-icons/tb";
const ProfileBox = styled.div`
  width: 180px;
  height: 180px;

`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 5px;
`;

const ProfileEmail = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`;

function Profile({ profileImage, profileEmail, profileName }) {
  console.log(profileEmail);

  return (
    <ProfileBox>
      {profileImage !== "null" && profileImage !== null ? (
        <ProfileImg src={profileImage} alt="프로필 이미지" />
      ) : (
        <TbUserEdit
          size={120}
          color="#3d3d3d"
          alt="edit"
          style={{
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />
      )}
    </ProfileBox>
  );
}

export default Profile;
