import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import App from "App";

const container = document.getElementById("root")!;
const root = createRoot(container);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

root.render(
    <React.StrictMode>
        <GlobalStyle />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
