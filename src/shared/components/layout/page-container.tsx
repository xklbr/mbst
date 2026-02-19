import { ReactNode } from "react";
import styled from "styled-components";

import { media } from "@shared/styles/media";

const Root = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.25rem;
  padding-top: calc(3.5rem + 1.25rem);

  ${media.desktopUp} {
    max-width: none;
    padding: 2rem 100px;
    padding-top: calc(85px + 2rem);
  }
`;

export function PageContainer({ children }: { children: ReactNode }) {
  return <Root>{children}</Root>;
}
