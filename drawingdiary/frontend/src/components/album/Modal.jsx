import React from "react";
import styled from "styled-components";
import { CgTrash } from "react-icons/cg";

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1); // 투명한 회색 배경
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; // ModalStyle보다 1 낮게 설정하여 모달이 위에 오도록 함
`;
const ModalStyle = styled.div`
    width: 350px;
    height: 230px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding-top: 30px;
    z-index: 1000;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    margin-top: 50px;
`;

const YesStyle = styled.button`
    width: 100px;
    height: 40px;
    margin: 10px;
    align-items: center;
    font-size: 15px;
    border-radius: 10px;
    border: 2px solid rgba(106, 156, 253, 0.3);
    background-color: white;
`;

const NoStyle = styled.button`
    width: 100px;
    height: 40px;
    margin: 10px;
    align-items: center;
    font-size: 15px;
    border-radius: 10px;
    border: none;
    background-color: rgba(106, 156, 253, 0.3);
`;


const Modal = ({ isOpen, onClose, onConfirm }) => {
    if(!isOpen) return null;

    return (
        <ModalBackground>
            <ModalStyle>
                <CgTrash size={30} color="3d3d3d" style={{marginBottom:'30px'}} />
                <p>앨범을 삭제하시겠습니까?</p>
                <ButtonContainer>
                    <YesStyle onClick={onConfirm}>예</YesStyle>
                    <NoStyle onClick={onClose}>아니오</NoStyle>
                </ButtonContainer>
            </ModalStyle>
        </ModalBackground>
    );
};

export default Modal;