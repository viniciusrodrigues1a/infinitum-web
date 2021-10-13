import React from "react";
import ReactDOM from "react-dom";

import "./reset.css";

import Routes from "./routes";

import { LanguageProvider } from "./contexts/LanguageContext";
import { SessionProvider } from "./contexts/SessionContext";

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <LanguageProvider>
        <Routes />
      </LanguageProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
