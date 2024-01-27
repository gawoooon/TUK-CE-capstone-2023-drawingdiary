import styled from "styled-components";

const ButtonStyle = styled.button`
    height: 50px;
    width: 250px;
    margin-bottom: 30px;
    background-color: rgba(106, 156, 253, 0.3);
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = ({ text, onClick }) => {
    return (
        <ButtonContainer>

            <ButtonStyle type="submit" onClick={onClick}>
                {text}
            </ButtonStyle>

        </ButtonContainer>
    )
}

export default Button