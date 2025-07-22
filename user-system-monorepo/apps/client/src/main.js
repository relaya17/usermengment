import { jsx as _jsx } from "react/jsx-runtime";
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CustomThemeProvider } from "./theme/ThemeContext";
import "./styles/main.scss";
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(BrowserRouter, { children: _jsx(CustomThemeProvider, { children: _jsx(App, {}) }) }) }) }));
