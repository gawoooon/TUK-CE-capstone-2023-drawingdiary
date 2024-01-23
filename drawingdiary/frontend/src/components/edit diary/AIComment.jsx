import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 450px;
    height: 352px;
    margin: 10px 30px 10px 0;
    background-color: rgba(106, 156, 253, 0.3);
    border-radius: 30px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
`;

const AIComment = () => {

    return(
        <div>
            <h3>AI의 코멘트</h3>
            <Container>

            </Container>
        </div>
    );
};

export default AIComment;