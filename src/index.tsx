import React from "react";
import ReactDOM from "react-dom";

import "./reset.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./routes";

import { LanguageProvider } from "./contexts/LanguageContext";
import { SessionProvider } from "./contexts/SessionContext";
import { APIServiceProvider } from "./contexts/APIServiceContext";

ReactDOM.render(
  <React.StrictMode>
    <>
      <ToastContainer style={{ zIndex: 9999999 }} />
      <APIServiceProvider>
        <SessionProvider>
          <LanguageProvider>
            <Routes />
          </LanguageProvider>
        </SessionProvider>
      </APIServiceProvider>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);
