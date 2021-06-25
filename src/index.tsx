import React from "react";
import ReactDOM from "react-dom";

import "./reset.css";

import Home from "./pages/Home";

import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
