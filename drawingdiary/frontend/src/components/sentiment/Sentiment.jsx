import React from "react";
import styled from "styled-components";
import DonutChart from "./DonutChart";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Sentiment = ({ positiveValue, negativeValue, neutralValue }) => {
  return (
    <Container>
      <DonutChart
        positiveValue={positiveValue}
        negativeValue={negativeValue}
        neutralValue={neutralValue}
      />
    </Container>
  );
};

export default Sentiment;
