"use client";

import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: ButtonVariant;
};

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  background: ${({ $variant }) => ($variant === "secondary" ? "#ffffff" : "#111111")};
  border: 1px solid #111111;
  color: ${({ $variant }) => ($variant === "secondary" ? "#111111" : "#ffffff")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 16px;
  height: 48px;
  letter-spacing: 0.02em;
  padding: 5px 7px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 361px;

  &:disabled {
    background: #f3f4f6;
    border-color: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
    opacity: 1;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
