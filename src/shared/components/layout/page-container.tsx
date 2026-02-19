import { ReactNode } from "react";
import styled from "styled-components";

import { media, theme } from "@shared/styles";

const Root = styled.main`
  margin: 0 auto;
  max-width: ${theme.layout.containerMaxWidth};
  padding: ${theme.layout.containerPaddingMobile};
  padding-top: calc(
    ${theme.layout.navbarHeightMobile} + ${theme.layout.containerPaddingMobile}
  );

  ${media.desktopUp} {
    max-width: none;
    padding: 2rem ${theme.layout.containerPaddingDesktop};
    padding-top: calc(${theme.layout.navbarHeightDesktop} + 2rem);
  }
`;

export function PageContainer({ children }: { children: ReactNode }) {
  return <Root>{children}</Root>;
}
