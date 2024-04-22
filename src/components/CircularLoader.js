import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes for the animation
const rotateAnimation = keyframes`
  50% {
    border-left-color: #9b59b6;
  }
  75% {
    border-left-color: #e67e22;
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the circular loader
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust as needed */
`;

const LoaderCircle = styled.div`
  position: relative;
  height: 125px;
  width: 125px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-left-color: #5cb85c;
  animation: ${rotateAnimation} 1.2s linear infinite;
`;

const CircularLoader = () => {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
};

export default CircularLoader;
