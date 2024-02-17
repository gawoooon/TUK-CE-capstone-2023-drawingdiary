import React from 'react';
import DonutChart from './DonutChart';

const Sentiment = ( { onAnalyzeSentiment, positiveValue, negativeValue, neutralValue } ) => {

  return (
    <div>
        <h3>감정분석</h3>
        <DonutChart
            positiveValue={positiveValue}
            negativeValue={negativeValue}
            neutralValue={neutralValue}
        />
    </div>
  );
};

export default Sentiment;