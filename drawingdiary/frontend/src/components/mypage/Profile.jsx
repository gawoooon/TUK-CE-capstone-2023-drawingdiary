import styled, { css } from "styled-components";

const ProfileBox = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(163, 163, 163, 0.3);
  padding: 5px 0;
  ${(props) =>
    !props.hasBorder &&
    css`
      border-bottom: none;
    `}
`;

const ProfileIcon = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileText = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
`;

function Profile({ icon: Icon, text, hasBorder }) {
  return (
    <ProfileBox hasBorder={hasBorder}>
      <ProfileIcon>
        <Icon size={36} color="#727272" />
      </ProfileIcon>
      <ProfileText> {text}</ProfileText>
    </ProfileBox>
  );
}

export default Profile;
