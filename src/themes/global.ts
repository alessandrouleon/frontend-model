import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  input, button, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
