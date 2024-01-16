import styled from "styled-components";

const SideBarStyle = styled.div`
    height: 900px;
    width: 90px;
    position: fixed;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #F9F9F9;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LinkStyle = styled.a`
    margin-top: 30px;
    padding: 8px 8px 6px 16px;
    text-decoration: none;
    font-size: 10px;
    color: #818181;
    display: block;
`;

const SideBar = () => {
    return (
        <SideBarStyle>
            <LinkStyle href="/calendar">Home</LinkStyle>
            <LinkStyle href="/album">Album</LinkStyle>
            <LinkStyle href="/stats">Analyze</LinkStyle>
            <LinkStyle href="/my">MyPage</LinkStyle>
        </SideBarStyle>
    );
};

export default SideBar;