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

    img {
        width: 25px;
        height: 25px;
    };
`;

const ImageWithMargin = styled.div`
    margin-top: 70px;
`;
const SideBar = () => {
    return (
        <SideBarStyle>
            <LinkStyle href="/calendar">
                <ImageWithMargin>
                    <img src="schedule.png" alt="Home"/>
                </ImageWithMargin>
            </LinkStyle>
            <LinkStyle href="/album">
                <img src="photo-album.png" alt="Album"/>
            </LinkStyle>
            <LinkStyle href="/stats">
                <img src="graph.png" alt="Statics"/>
            </LinkStyle>
            <LinkStyle href="/my">
                <img src="my-page.png" alt="MyPage"/>
            </LinkStyle>
        </SideBarStyle>
    );
};

export default SideBar;