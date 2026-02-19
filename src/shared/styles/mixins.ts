import { css } from "styled-components";

import { media } from "./media";
import { theme } from "./theme";

/**
 * Standard horizontal container constraint.
 * Mobile: max-width 1200px with 1.25rem side padding.
 * Desktop: full-width with 100px side padding.
 */
export const containerLayout = css`
  max-width: ${theme.layout.containerMaxWidth};
  padding-left: ${theme.layout.containerPaddingMobile};
  padding-right: ${theme.layout.containerPaddingMobile};

  ${media.desktopUp} {
    max-width: none;
    padding-left: ${theme.layout.containerPaddingDesktop};
    padding-right: ${theme.layout.containerPaddingDesktop};
  }
`;
