import styled from "styled-components"

const ButtonStyle = styled.button `
    height: 40px;
    width: 60px;
    margin-left: 10px;
    background-color: rgba(106, 156, 253, 0.3);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: black;
    font-size: 13px;
    text-align: center;
`;

const SmallButton = ({ text }) => {
    return (
        <ButtonStyle type="button">
            {text}
        </ButtonStyle>
    )
}

export default SmallButton