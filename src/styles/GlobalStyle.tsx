import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Pretendard-Regular', sans-serif;
  width: 100%;
  height: 100%;
}
`;

export default GlobalStyle;
