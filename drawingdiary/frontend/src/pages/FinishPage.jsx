import styled from "styled-components";
import Background from "../components/Background";
import Button from "../components/button/Button";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";

const Container = styled.div`
    height: 450px;
    width: 700px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #8C8C8C;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
        font-weight: lighter;
    };
`;

const FinishPage = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/calendar');
    };

    const confettiRef = useRef(new JSConfetti());

    useEffect( () => {
        confettiRef.current.addConfetti();
    }, []);


    return(
        <Background>

            <Container>

                <h2>회원가입이<br/>완료되었습니다!</h2>

                <Button text="메인화면으로" onClick={handleSubmit}/>

            </Container>

        </Background>
    );
};

export default FinishPage;



