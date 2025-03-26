import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #39a1ae;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${rotate} 2s linear infinite;
`;

const LoaderComponent = () => {
  window.scrollTo(0, 0)
  return (
    <Wrapper>

      <div className="loader-container">
        <Loader />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
.loader-container{
  background-color: aliceblue;
  display: flex;
  justify-content: space-evenly;
}
`
export default LoaderComponent;
