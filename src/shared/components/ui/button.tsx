"use client";

import styled from "styled-components";

import { theme } from "@shared/styles/theme";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: ButtonVariant;
};

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  background: ${({ $variant }) =>
    $variant === "secondary" ? theme.colors.bg : theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  color: ${({ $variant }) =>
    $variant === "secondary" ? theme.colors.primary : theme.colors.primaryText};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSize.base};
  height: 3rem;
  letter-spacing: 0.02em;
  padding: 0.3125rem 0.4375rem;
  text-transform: uppercase;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 22.5625rem;

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
