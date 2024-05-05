import styled from "styled-components";

const ShortSideBarStyle = styled.div`
    width: 80px;
    height: 80px;
    position: fixed;
    z-index: 9999;
    border-radius: 10px;
    background-color: rgba(249, 249, 249, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: height 200ms linear;
    cursor: pointer;

    &:hover{
        height: 400px;
        background-color: #ececec;
    }

`;

const LinkStyle = styled.a`
    margin-top: 30px;
    padding: 0 8px;
    text-decoration: none;
    font-size: 10px;
    color: #818181;
    display: block;
    opacity: 0; /*초기에는 숨김*/
    transition: opacity 180ms linear;

    img {
        width: 25px;
        height: 25px;
    };

    &:first-child {
        opacity: 1; /*뒤로가기 메뉴는 항상 보이도록 설정*/
    }

    ${ShortSideBarStyle}:hover & {
        opacity: 1;
    }
    

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

