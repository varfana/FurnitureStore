import React, { useState } from "react";
import styled from "styled-components";
import { GrFormSubtract } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
const QuantityCounter = ({ data }) => {
  const { quantity, setQuantity } = data;
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Wrapper>
      <div className="quantity">
        Quantity:
        <button className="btn" onClick={handleDecrement}>
          <GrFormSubtract></GrFormSubtract>
        </button>
        <span>{quantity}</span>
        <button className="btn" onClick={handleIncrement}>
          <IoMdAdd></IoMdAdd>
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  font-size: 1.4rem;
  .quantity {
    display: flex;
    width: 20%;
    justify-content: space-between;
  }
  .btn {
    padding: 0;
    margin: 0;
    background: aliceblue;
    color: black;
  }
`;
export default QuantityCounter;
