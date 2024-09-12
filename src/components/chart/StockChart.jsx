import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

export const StockChart = (props) => {
  const client = axios.create();
  const [chartData, setChartData] = useState({
    series: [{
      name: "Stock Price",
      data: [] // 캔들스틱 데이터를 여기에 채울 예정
    }],
    options: {
      chart: {
        type: 'candlestick', // 캔들스틱 그래프로 설정
        height: 400,
        zoom: {
          enabled: true, // 줌을 사용할 수 있게 설정
          type: 'x', // X축 방향으로만 줌 가능
          autoScaleYaxis: true, // Y축 자동 스케일링
        },
        toolbar: {
          autoSelected: 'zoom', // 툴바에서 줌 툴이 기본 선택
          tools: {
            zoom: true,
            pan: true // 팬 기능 활성화
          }
        }
      },
      title: {
        text: props.name,
        align: 'left'
      },
      xaxis: {
        labels: {
          show: false // X축 라벨 숨기기
        },
        range: 70, // X축 범위 설정
        scrollbar: {
          enabled: true // 스크롤바 활성화
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }
  });

  const fetchStockData = async () => {
    try {
      const res = await client.get('https://booth.hasclassmatching.com/'+props.stockId);
      const values = res.data;

      // 캔들스틱 데이터 생성 (시가, 고가, 저가, 종가 순서로 배열에 넣음)
      const closingPrices = values.map((data, idx) => ({
        x: (idx+1).toString(), // 날짜를 가정, 실제 데이터 사용 시 변경
        y: [data.open, data.high, data.low, data.close] // 시가, 고가, 저가, 종가 배열
      }));

      
      if (props !== undefined && closingPrices.length > 0) {
        props.setPrice(closingPrices[closingPrices.length - 1].y[3]);
      }

      setChartData(prevChartData => ({
        ...prevChartData,
        series: [{ name: "Stock Price", data: closingPrices }]
      }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    setInterval(fetchStockData, 3000); // 1초마다 초기 데이터 요청
  }, []);

  return (
    <div>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="candlestick" // 캔들스틱 차트
        height={350}
        width={props.width}
      />
    </div>
  );
};
