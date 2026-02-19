export const theme = {
  colors: {
    bg: "#ffffff",
    text: "#1b1b1b",
    mutedText: "#666666",
    border: "#e5e7eb",
    card: "#f8fafc",
    primary: "#000000",
    primaryText: "#ffffff",
    danger: "#df0000",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  fontSize: {
    xs: "0.625rem",   // 10px
    sm: "0.75rem",    // 12px
    md: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.25rem",    // 20px
  },
  breakpoints: {
    mobile: "393px",
    tablet: "768px",
    desktop: "1024px",
    largeDesktop: "1200px",
  },
  layout: {
    navbarHeightMobile: "3.5rem",
    navbarHeightDesktop: "5.3125rem",
    containerPaddingMobile: "1.25rem",
    containerPaddingDesktop: "6.25rem",
    containerMaxWidth: "1200px",
  },
  borders: {
    thin: "0.5px solid #000000",
  },
  frames: {
    mobile: { width: 393, height: 852 },
    desktop: { width: 1920, height: 1080 },
  },
} as const;

export type AppTheme = typeof theme;
