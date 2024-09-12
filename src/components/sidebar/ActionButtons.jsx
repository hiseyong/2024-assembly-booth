// ActionButtons.js
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ sell }) => (sell ? '#ff4d4d' : '#4CAF50')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const ActionButtons = (props) => {
  const client = axios.create()
  const onBuy = () => {
    client.post('http://3.36.171.50:8000/buy_stock'+(props.index + 1).toString(),
      {
        "std_id": props.userData.std_id,
        "token": props.userData.token,
        ["stock"+(props.index + 1).toString()]: props.quantity
      }
    )
    .then((res) => {
      const text = res.data
      if (typeof text === 'object') {
        alert("성공적으로 매수하였습니다.")
        client.post('http://3.36.171.50:8000/update_capital',{
          "std_id" : props.userData.std_id,
        })
        .then((res) => {
          const data = res.data
          props.setUserCapital(data)
        })
      }
      else alert(text);

      
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const onSell = () => {
    client.post('http://3.36.171.50:8000/sell_stock'+(props.index + 1).toString(),
      {
        "std_id": props.userData.std_id,
        "token": props.userData.token,
        ["stock"+(props.index + 1).toString()]: props.quantity
      }
    )
    .then((res) => {
      const text = res.data
      if (typeof text === 'object') alert("성공적으로 매도하였습니다.")
      else alert(text)

      client.post('http://3.36.171.50:8000/update_capital',{
        "std_id" : props.userData.std_id,
      })
      .then((res) => {
        const data = res.data
        props.setUserCapital(data)
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <ButtonContainer>
      <Button onClick={onBuy}>매수(구매)</Button>
      <Button sell onClick={onSell}>매도(판매)</Button>
    </ButtonContainer>
  );
};
