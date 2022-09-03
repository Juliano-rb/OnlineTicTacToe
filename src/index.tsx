import React from 'react';
import { render } from "react-dom";
// import './index.css';
import reportWebVitals from './reportWebVitals';
import Reset from './assets/styles/reset';
import GlobalStyle from "./style";
import Pages from './pages';

render(
  <React.StrictMode>
    <Reset />
    <GlobalStyle />
    <Pages />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
