import { ReactNode } from "react";
import styled from "styled-components";

const Root = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.25rem;
  padding-top: calc(3.5rem + 1.25rem);

  @media (min-width: 768px) {
    padding: 2rem;
    padding-top: calc(3.5rem + 2rem);
  }
`;

export function PageContainer({ children }: { children: ReactNode }) {
  return <Root>{children}</Root>;
}
