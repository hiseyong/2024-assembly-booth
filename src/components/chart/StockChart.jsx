import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

export const StockChart = (props) => {
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


  useEffect(() => {
    setChartData(prevChartData => ({
      ...prevChartData,
      series: [{ name: "Stock Price", data: props.stockData }]
    }));
  }, [props]);

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
