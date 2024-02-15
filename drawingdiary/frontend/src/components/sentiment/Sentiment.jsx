import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonutChart from './DonutChart';

const Sentiment = ( { text } ) => {

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);

  // const text = "오늘은 하루종일 집에서 일을 했다. 힘들었지만 하던 일을 완수해서 기분이 좋았다."
  console.log(text);

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        // 서버 프록시 엔드포인트로 요청 전송
        const response = await axios.post('/api/sentiment', { content: text });

        // 응답에서 감정분석 결과 추출
        const { positive, negative, neutral } = response.data.document.confidence;

        // 소수점 두 자리까지 반올림하여 상태 업데이트
        setPositiveValue(Math.round(positive * 100) / 100);
        setNegativeValue(Math.round(negative * 100) / 100);
        setNeutralValue(Math.round(neutral * 100) / 100);

      } catch (error) {
        console.error('감정 분석 API 호출 중 오류 발생: ', error);
      }
    };

    if(text) fetchSentimentData();
  }, [text]);

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