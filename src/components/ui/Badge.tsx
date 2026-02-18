import styled from "styled-components";

type BadgeProps = {
  label: string;
};

const BadgeRoot = styled.span`
  align-items: center;
  background: #111111;
  border-radius: 999px;
  color: #ffffff;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 600;
  justify-content: center;
  min-width: 1.5rem;
  padding: 0.125rem 0.5rem;
`;

export function Badge({ label }: BadgeProps) {
  return <BadgeRoot aria-label={`Cart items: ${label}`}>{label}</BadgeRoot>;
}
