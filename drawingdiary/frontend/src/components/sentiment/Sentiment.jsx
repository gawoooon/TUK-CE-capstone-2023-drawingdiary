import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DonutChart from './DonutChart';

const Sentiment = () => {

  const [positiveValue, setPositiveValue] = useState(0);
  const [negativeValue, setNegativeValue] = useState(0);
  const [neutralValue, setNeutralValue] = useState(0);

  useEffect(() => {
    const fetchSentimentData = async () => {
      const apiUrl = 'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze';
      const data = JSON.stringify({
        content: "오늘은 정말 기분이 좋은 날이야."
      });
  
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-NCP-APIGW-API-KEY-ID': 'ksnv4tfdvd', // 발급받은 Client ID
            'X-NCP-APIGW-API-KEY': 'nJ0L2fO6t8jwOqpgcZsplPniprZo7eHiVBWdHt32', // 발급받은 Client Secret
          },
          body: data
        });
  
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
  
        const result = await response.json();
        setPositiveValue(result.document.confidence.positive * 100);
        setNegativeValue(result.document.confidence.negative * 100);
        setNeutralValue(result.document.confidence.neutral * 100);
      } catch (error) {
        console.error('감정 분석 API 호출 중 오류 발생:', error);
      }
    };
  
    fetchSentimentData();
  }, []);

  return (
    <div>
        <h3>감정분석 결과: {positiveValue}</h3>
        <DonutChart
            positiveValue={positiveValue}
            negativeValue={negativeValue}
            neutralValue={neutralValue}
        />
    </div>
  );
};

export default Sentiment;