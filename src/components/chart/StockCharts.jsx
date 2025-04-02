import { StockChart } from './StockChart';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ContentContainer = styled.div`
  margin-left: 340px;
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
  const client = axios.create();
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 320);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [price3, setPrice3] = useState(0);
  const [price4, setPrice4] = useState(0);
  const [stockData, setStockData] = useState([]);

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


  const fetchStockData = async () => {
    try {
      const res = await client.get('https://booth.hasclassmatching.com/get_all_stock_price');
      const values = res.data; // 주식 데이터

      let temp = []

      // 캔들스틱 데이터 생성 (시가, 고가, 저가, 종가 순서로 배열에 넣음)
      for (let i = 0; i < 4; i++) {
        const closingPrices = values[i].map((data, idx) => ({
          x: (idx+1).toString(), // 날짜를 가정, 실제 데이터 사용 시 변경
          y: [data.open, data.high, data.low, data.close] // 시가, 고가, 저가, 종가 배열
        }));

        temp.push(closingPrices);
      }

      setStockData(temp);

      setPrice1(temp[0][temp[0].length - 1].y[3]);
      setPrice2(temp[1][temp[1].length - 1].y[3]);
      setPrice3(temp[2][temp[2].length - 1].y[3]);
      setPrice4(temp[3][temp[3].length - 1].y[3]);
    

      // props.setQuantity(closingPrices.length);

      
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setInterval(fetchStockData, 3000);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <ContentContainer>
        <StockChart width={chartWidth / 2.3} name='삼성양성자' stockData={stockData[0]} />
        <StockChart width={chartWidth / 2.3} name='에스게이 하이닉스' stockData={stockData[1]} />
        <StockChart width={chartWidth / 2.3} name='GL 전자' stockData={stockData[2]} />
        <StockChart width={chartWidth / 2.3} name='오이마켓' stockData={stockData[3]} />
      </ContentContainer>
  );
};
