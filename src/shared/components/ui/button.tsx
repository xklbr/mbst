import styled from "styled-components";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  background: ${({ $variant }) => ($variant === "primary" ? "#111111" : "#ffffff")};
  border: 1px solid #111111;
  color: ${({ $variant }) => ($variant === "primary" ? "#ffffff" : "#111111")};
  cursor: pointer;
  font-size: 16px;
  height: 48px;
  letter-spacing: 0.02em;
  padding: 5px 7px;
  text-transform: uppercase;
  transition: background 0.2s ease;
  width: 361px;

  &:disabled {
    background: #f3f4f6;
    border-color: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
    opacity: 1;
  }
`;

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <StyledButton $variant={variant} {...props} />;
}
