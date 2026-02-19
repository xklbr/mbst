export const theme = {
  colors: {
    bg: "#ffffff",
    text: "#1b1b1b",
    mutedText: "#666666",
    border: "#e5e7eb",
    card: "#f8fafc",
    primary: "#111111",
    primaryText: "#ffffff",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  breakpoints: {
    mobile: "393px",
    tablet: "768px",
    desktop: "1024px",
    largeDesktop: "1200px",
  },
  frames: {
    mobile: { width: 393, height: 852 },
    desktop: { width: 1920, height: 1080 },
  },
} as const;

export type AppTheme = typeof theme;
