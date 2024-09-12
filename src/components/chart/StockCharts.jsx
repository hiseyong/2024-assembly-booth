import { StockChart } from './StockChart';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ContentContainer = styled.div`
  margin-left: 300px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  width: calc(100% - 300px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 0;
`;

export const StockCharts = (props) => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 320);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [price3, setPrice3] = useState(0);
  const [price4, setPrice4] = useState(0);

  useEffect(()=>{
    props.setPrices({
      stock1: price1,
      stock2: price2,
      stock3: price3,
      stock4: price4
    });
  },[price1, price2, price3, price4]);

  const handleResize = () => {
    setChartWidth(window.innerWidth - 320);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <ContentContainer>
        <StockChart width={chartWidth / 2.3} name='삼성양성자' stockId='stock1' setPrice={setPrice1}/>
        <StockChart width={chartWidth / 2.3} name='에스게이 하이닉스' stockId='stock2' setPrice={setPrice2}/>
        <StockChart width={chartWidth / 2.3} name='GL 전자' stockId='stock3' setPrice={setPrice3}/>
        <StockChart width={chartWidth / 2.3} name='오이마켓' stockId='stock4' setPrice={setPrice4}/>
      </ContentContainer>
  );
};
