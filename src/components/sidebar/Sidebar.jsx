// Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { Accordion } from './Accordion';
import { StockInput } from './StockInput';
import { ActionButtons } from './ActionButtons';
import { useState, useEffect } from 'react';
import { Login } from './Login';

const SidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto; /* 자식이 많으면 y축 스크롤 가능하게 함 */
`;


const WelcomeMessage = styled.div`
  font-size: 18px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 6px;
  font-size: 14px;
  text-align: center;
`;

export const Sidebar = (props) => {
  const [userData, setUserData] = useState(
    {
      "capital": 0,
      "std_id": "",
      "token": "",
      "username": "",
      "password": ""
    }
  );
  const [userCapital, setUserCapital] = useState(
    {
      "total_capital": 0,
      "capital": 0,
      "stock1": 0,
      "stock2": 0,
      "stock3": 0,
      "stock4": 0
    }
  );
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [index, setIndex] = useState(null);

  return (
    <SidebarContainer>
      {userData.std_id !== "" ? (
        <>
          <WelcomeMessage>
            환영합니다, {userData.username}님! <br /> <hr />
          </WelcomeMessage>

          {/* 자산 정보를 표로 표시 */}
          <Table>
            <thead>
              <tr>
                <TableHeader>자산 종류</TableHeader>
                <TableHeader>보유량</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>총 자산 가치</TableCell>
                <TableCell>{userCapital.total_capital} points</TableCell>
              </tr>
              <tr>
                <TableCell>보유 현금</TableCell>
                <TableCell>{userCapital.capital} points</TableCell>
              </tr>
              <tr>
                <TableCell>삼성양성자 주식</TableCell>
                <TableCell>{userCapital.stock1} 주</TableCell>
              </tr>
              <tr>
                <TableCell>에스게이 하이닉스 주식</TableCell>
                <TableCell>{userCapital.stock2} 주</TableCell>
              </tr>
              <tr>
                <TableCell>GL전자 주식</TableCell>
                <TableCell>{userCapital.stock3} 주</TableCell>
              </tr>
              <tr>
                <TableCell>오이마켓 주식</TableCell>
                <TableCell>{userCapital.stock4} 주</TableCell>
              </tr>
            </tbody>
          </Table>

          <WelcomeMessage>매수 / 매도할 종목을 선택해주세요.</WelcomeMessage>
          <Accordion prices={props.prices} setSelectedPrice={setSelectedPrice} setIndex={setIndex} />
          <StockInput selectedPrice={selectedPrice} setQuantity={setQuantity} />
          <ActionButtons userData={userData} quantity={quantity} index={index} setUserCapital={setUserCapital} />
        </>
      ) : (
        <Login setUserData={setUserData} setUserCapital={setUserCapital} />
      )}
    </SidebarContainer>
  );
};