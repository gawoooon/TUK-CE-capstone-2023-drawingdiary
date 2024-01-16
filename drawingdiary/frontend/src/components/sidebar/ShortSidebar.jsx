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
    display: block;

    img {
        width: 25px;
        height: 25px;
    };

`;

const ShortSidebar = () => {
    return (
        <ShortSideBarStyle>
            <LinkStyle href="/calendar">
                <img src="/left-arrow.png" alt="Back"/>
            </LinkStyle>

            <LinkStyle href="/calendar">
                <img src="/schedule.png" alt="Home"/>
            </LinkStyle>

            <LinkStyle href="/album">
                <img src="/photo-album.png" alt="Album"/>
            </LinkStyle>

            <LinkStyle href="/stats">
                <img src="/graph.png" alt="Statics"/>
            </LinkStyle>

            <LinkStyle href="/my">
                <img src="/my-page.png" alt="MyPage"/>
            </LinkStyle>
        </ShortSideBarStyle>
    );
};

export default ShortSidebar;

