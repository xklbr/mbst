import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Colors */
    --color-bg: #ffffff;
    --color-text: #1b1b1b;
    --color-muted-text: #666666;
    --color-border: #e5e7eb;
    --color-card: #f8fafc;
    --color-primary: #000000;
    --color-primary-text: #ffffff;
    --color-danger: #df0000;

    /* Font sizes */
    --font-size-xs: 0.625rem;
    --font-size-sm: 0.75rem;
    --font-size-md: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;

    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Layout */
    --navbar-height-mobile: 3.5rem;
    --navbar-height-desktop: 5.3125rem;
    --container-padding-mobile: 1.25rem;
    --container-padding-desktop: 6.25rem;
    --container-max-width: 1200px;

    /* Borders */
    --border-thin: 0.5px solid #000000;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    background: var(--color-bg);
    color: var(--color-primary);
    line-height: 1.5;
  }

  * {
    font-family: inherit;
    font-weight: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;
