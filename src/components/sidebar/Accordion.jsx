import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AccordionItem = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? '#C0EEC2' : '#fff')}; /* 선택된 항목의 배경색 변경 */
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const AccordionContent = styled.div`
  padding: 10px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

export const Accordion = (props) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [stocks, setStocks] = useState([
    { name: '주식1', price: 0 },
    { name: '주식2', price: 0 },
    { name: '주식3', price: 0 },
    { name: '주식4', price: 0 },
  ]);

  useEffect(()=>{
    setStocks([
      { name: '삼성양성자', price: props.prices.stock1 },
      { name: '에스게이 하이닉스', price: props.prices.stock2 },
      { name: 'GL전자', price: props.prices.stock3 },
      { name: '오이마켓', price: props.prices.stock4 },
    ]);
  },[props.prices])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(()=>{
    if (openIndex === null) return;
    props.setSelectedPrice(stocks[openIndex].price);
    props.setIndex(openIndex);
  },[openIndex, stocks])

  return (
    <AccordionContainer>
      {stocks.map((stock, index) => (
        <AccordionItem
          key={stock.name}
          onClick={() => toggleAccordion(index)}
          isSelected={openIndex === index} // 선택 여부를 전달
        >
          {stock.name}
          <AccordionContent isOpen={openIndex === index}>
            현재 주가: {stock.price}원
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};
