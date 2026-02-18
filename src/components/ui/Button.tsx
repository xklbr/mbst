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
  letter-spacing: 0.02em;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: background 0.2s ease;
  width: 380px;

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
