import styled from "styled-components";

const ProfileBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 0 0;
  box-sizing: border-box;
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: pink;
  margin-bottom: 20px;
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

function Profile() {
  const setEmail = localStorage.getItem("setEmail");
  const setName = localStorage.getItem("setName");
  return (
    <ProfileBox>
      <ProfileImg />
      <ProfileName>{setName}</ProfileName>
      <ProfileEmail>{setEmail}</ProfileEmail>
    </ProfileBox>
  );
}

export default Profile;
