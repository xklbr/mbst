"use client";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<{ $fullPage?: boolean }>`
  align-items: center;
  display: flex;
  height: ${(props) => (props.$fullPage ? "100vh" : "100%")};
  justify-content: center;
  min-height: ${(props) => (props.$fullPage ? "100vh" : "200px")};
  width: 100%;
`;

const SpinnerCircle = styled.div<{ size?: number }>`
  animation: ${rotate} 0.8s linear infinite;
  border: 3px solid #cccccc;
  border-radius: 50%;
  border-top: 3px solid #000000;
  height: ${(props) => props.size || 32}px;
  width: ${(props) => props.size || 32}px;
`;

type SpinnerProps = {
  size?: number;
  fullPage?: boolean;
};

export function Spinner({ size, fullPage = true }: SpinnerProps) {
  return (
    <Container $fullPage={fullPage}>
      <SpinnerCircle size={size} />
    </Container>
  );
}
