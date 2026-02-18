import styled from "styled-components";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Root = styled.button`
  align-items: center;
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  height: 2rem;
  justify-content: center;
  width: 2rem;
`;

export function IconButton(props: IconButtonProps) {
  return <Root {...props} />;
}
