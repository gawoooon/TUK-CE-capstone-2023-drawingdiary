import styled from "styled-components";

const SideBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #f9f9f9;
  padding-left: 20px;
  box-sizing: border-box;
`;

const LinkStyle = styled.a`
  margin-top: 30px;
  padding: 8px 8px 6px 16px;
  text-decoration: none;
  font-size: 10px;
  color: #818181;
  display: block;

  img {
    width: 25px;
    height: 25px;
  }
`;

const SideBar = () => {
  return (
    <SideBarStyle>
      <LinkStyle href="/calendar">
        <img src="schedule.png" alt="Home" />
      </LinkStyle>
      <LinkStyle href="/album">
        <img src="photo-album.png" alt="Album" />
      </LinkStyle>
      <LinkStyle href="/stats">
        <img src="graph.png" alt="Statics" />
      </LinkStyle>
      <LinkStyle href="/my">
        <img src="my-page.png" alt="MyPage" />
      </LinkStyle>
    </SideBarStyle>
  );
};

export default SideBar;
