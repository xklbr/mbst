export const theme = {
  colors: {
    bg: "var(--color-bg)",
    text: "var(--color-text)",
    mutedText: "var(--color-muted-text)",
    border: "var(--color-border)",
    card: "var(--color-card)",
    primary: "var(--color-primary)",
    primaryText: "var(--color-primary-text)",
    danger: "var(--color-danger)",
  },
  spacing: {
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
  },
  fontSize: {
    xs: "var(--font-size-xs)",
    sm: "var(--font-size-sm)",
    md: "var(--font-size-md)",
    base: "var(--font-size-base)",
    lg: "var(--font-size-lg)",
  },
  // Raw values required — CSS custom properties cannot be used in @media queries
  breakpoints: {
    mobile: "393px",
    tablet: "768px",
    desktop: "1024px",
    largeDesktop: "1200px",
  },
  layout: {
    navbarHeightMobile: "var(--navbar-height-mobile)",
    navbarHeightDesktop: "var(--navbar-height-desktop)",
    containerPaddingMobile: "var(--container-padding-mobile)",
    containerPaddingDesktop: "var(--container-padding-desktop)",
    containerMaxWidth: "var(--container-max-width)",
  },
  borders: {
    thin: "var(--border-thin)",
  },
  frames: {
    mobile: { width: 393, height: 852 },
    desktop: { width: 1920, height: 1080 },
  },
} as const;

export type AppTheme = typeof theme;
