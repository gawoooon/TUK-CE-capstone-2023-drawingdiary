import React from 'react';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

const DonutChartContainer = styled.div`
  width: 350px;
`;

const DonutChart = ({ positiveValue, negativeValue, neutralValue }) => {

  const donutData = {
    series: [positiveValue, negativeValue, neutralValue],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      labels: ['긍정', '부정', '중립'],
      colors: ['#FBC1AD', '#7DABD0', '#FFDF6F'],
    },
  };

  return (
    <DonutChartContainer>
      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width="100%"
      />
    </DonutChartContainer>
  );
};

export default DonutChart;
