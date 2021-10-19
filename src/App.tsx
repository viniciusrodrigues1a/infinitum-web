import React, { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./reset.css";

import Routes from "./routes";

import { LanguageProvider } from "./contexts/LanguageContext";
import { SessionProvider } from "./contexts/SessionContext";
import { APIServiceProvider } from "./contexts/APIServiceContext";
import { SidebarProvider } from "./contexts/SidebarContext";

export default function App(): React.ReactElement {
  useEffect(() => {
    const removePreloadClassName = () => {
      document.body.classList.remove("preload");
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", removePreloadClassName);
    } else {
      removePreloadClassName();
    }
  }, []);

  return (
    <>
      <ToastContainer style={{ zIndex: 9999999 }} />
      <LanguageProvider>
        <SessionProvider>
          <APIServiceProvider>
            <SidebarProvider>
              <Routes />
            </SidebarProvider>
          </APIServiceProvider>
        </SessionProvider>
      </LanguageProvider>
    </>
  );
}
