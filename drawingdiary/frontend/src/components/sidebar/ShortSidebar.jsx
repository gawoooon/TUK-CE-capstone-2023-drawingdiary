import styled from "styled-components";

const ShortSideBarStyle = styled.div`
    height: 400px;
    width: 80px;
    position: fixed;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #F9F9F9;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LinkStyle = styled.a`
    margin-top: 30px;
    padding: 6px 8px;
    text-decoration: none;
    font-size: 10px;
    color: #818181;
    display: block
`;

const ShortSidebar = () => {
    return (
        <ShortSideBarStyle>
            <LinkStyle href="/calendar">Back</LinkStyle>
            <LinkStyle href="/calendar">Home</LinkStyle>
            <LinkStyle href="/album">Album</LinkStyle>
            <LinkStyle href="/stats">Analyze</LinkStyle>
            <LinkStyle href="/my">MyPage</LinkStyle>
        </ShortSideBarStyle>
    );
};

export default ShortSidebar;

