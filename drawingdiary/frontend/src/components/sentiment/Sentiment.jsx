import React from 'react';
import styled from 'styled-components';
import DonutChart from './DonutChart';

const Container = styled.div`
  width: 600px;
  height: 410px;
  margin: 10px 30px 10px 0;
  background-color: rgba(256, 256, 256, 0.1);
  border-radius: 30px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Sentiment = ( { positiveValue, negativeValue, neutralValue } ) => {

  return (
    <div>
        <h3>감정분석</h3>
        <Container>
          <DonutChart
              positiveValue={positiveValue}
              negativeValue={negativeValue}
              neutralValue={neutralValue}
          />
        </Container>
    </div>
  );
};

export default Sentiment;