import { forwardRef } from "react";
import styled from "styled-components";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Root = styled.input`
  border: 1px solid #d1d5db;
  min-height: 2.75rem;
  padding: 0.625rem 0.75rem;
  width: 100%;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Root ref={ref} {...props} />;
});

Input.displayName = "Input";
