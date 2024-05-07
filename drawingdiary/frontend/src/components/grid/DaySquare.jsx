import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiEntryDoor } from 'react-icons/gi';
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
  position: relative;
  &:hover div {
    visibility: visible;
  }
`;

const HoverStyle = styled.div`
  visibility: hidden;
  font-size: 10px;
  color: #da0000;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  top: -20px;
  left: -30px;
  padding: 2px 5px;
  white-space: nowrap;
  z-index: 1;
`;

const DaySquare = ({ item }) => {

  // data를 불러와 isWrittem이 false이면 흰색, 아니면 다른 색으로 설정해줘야 함.
  const getColor = (item) => {
    switch(item.iswritten) {
      case 0: return '#ebedf0'; 
      case 1: return '#f89de4';
      default: return '#ebedf0';
    }
  };

  
  return (
    <GridItem color={getColor(item)}>
      {item.iswritten === 1 && (
        <HoverStyle>
          {item.writtenDate}
        </HoverStyle>
      )}
    </GridItem>
  );
};

const GrassGraph = () => {
  
  const accessToken = localStorage.getItem('accessToken');
  const [grid, setGrid] = useState([]);
  
  const fetchGrid = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/statistic', 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const isWrittenData = response.data.lawn.data.map(item => ({
        writtenDate : item.date,
        iswritten : item.iswritten ? 1 : 0,
      }));
      setGrid(isWrittenData);
    } catch(error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchGrid();
  }, []);

  return (
    <GridContainer>
      {grid.map((item, index) => (
        <DaySquare key={index} item={item} />
      ))}
    </GridContainer>
  );
};

export default GrassGraph;
