import { theme } from "./theme";

const bp = theme.breakpoints;

/**
 * Centralized media query helpers for styled-components.
 *
 * Breakpoints:
 *   mobileOnly      max-width: 767px
 *   tabletUp        min-width: 768px
 *   tabletOnly      min-width: 768px and max-width: 1023px
 *   desktopUp       min-width: 1024px
 *   largeDesktopUp  min-width: 1200px
 *   hoverDesktop    (hover: hover) and min-width: 1024px
 *
 * Usage:
 *   import { media } from "@shared/styles/media";
 *
 *   const Foo = styled.div`
 *     font-size: 14px;
 *
 *     ${media.desktopUp} {
 *       font-size: 16px;
 *     }
 *   `;
 */
export const media = {
  mobileOnly: `@media (max-width: ${parseInt(bp.tablet) - 1}px)`,
  tabletUp: `@media (min-width: ${bp.tablet})`,
  tabletOnly: `@media (min-width: ${bp.tablet}) and (max-width: ${parseInt(bp.desktop) - 1}px)`,
  desktopUp: `@media (min-width: ${bp.desktop})`,
  largeDesktopUp: `@media (min-width: ${bp.largeDesktop})`,
  hoverDesktop: `@media (hover: hover) and (min-width: ${bp.desktop})`,
} as const;
