// StockInput.js
import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const StockInput = (props) => {
  const [quantity, setQuantity] = useState(0);

  const handleChange = (e) => {
    setQuantity(e.target.value);
    props.setQuantity(e.target.value);
  };

  return (
    <InputContainer>
      <Label htmlFor="quantity">매수/매도할 주식 수:</Label>
      <Input
        id="quantity"
        type="number"
        value={quantity}
        onChange={handleChange}
        min="0"
      />
      총 비용: {quantity * props.selectedPrice} points
    </InputContainer>
  );
};
