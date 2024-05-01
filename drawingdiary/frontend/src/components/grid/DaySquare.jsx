import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%; 
  height: 150px;
  padding-top: 20px;
`;

const GridItem = styled.div`
  width: 16px; 
  height: 16px; 
  margin: 2px;
  background-color: ${props => props.color};
  border-radius: 5px;
`;


const DaySquare = ({ level }) => {

  
  const getColor = (level) => {
    switch(level) {
      case 0: return '#ebedf0'; 
      case 1: return '#9be9a8'; 
      case 2: return '#40c463'; 
      case 3: return '#30a14e'; 
      case 4: return '#216e39'; 
      default: return '#ebedf0';
    }
  };

  
  return <GridItem color={getColor(level)} />;
};


const GrassGraph = () => {
  
  const accessToken = localStorage.getItem('accessToken');
  const [grid, setGrid] = useState([]);
  
  const fetchGrid = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistic', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setGrid(response.data.laun.data);
      console.log("response: ", grid);
    } catch(error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchGrid();
  }, []);

  const activityData = new Array(365).fill(0).map(() => Math.floor(Math.random() * 5));

  return (
    <GridContainer>
      {activityData.map((level, index) => (
        <DaySquare key={index} level={level} />
      ))}
    </GridContainer>
  );
};

export default GrassGraph;
