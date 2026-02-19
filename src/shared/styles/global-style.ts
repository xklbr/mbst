import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
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
    background: #ffffff;
    color: #000000;
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
    outline: 2px solid #000000;
    outline-offset: 2px;
  }
`;
