import React from 'react';
import DonutChart from './DonutChart';

const Sentiment = () => {
  const positiveValue = 50; // 긍정적인 감정 결과 값으로 변경
  const negativeValue = 30; // 부정적인 감정 결과 값으로 변경
  const neutralValue = 20;  // 중립적인 감정 결과 값으로 변경

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