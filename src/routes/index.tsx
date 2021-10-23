import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import AuthorizedRoute from "./AuthorizedRoute";
import RoutesEnum from "./type-defs/RoutesEnum";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";

import { LanguageProvider } from "../contexts/LanguageContext";
import { SessionProvider } from "../contexts/SessionContext";
import { APIServiceProvider } from "../contexts/APIServiceContext";
import { SidebarProvider } from "../contexts/SidebarContext";

export default function Routes(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <LanguageProvider>
          <SessionProvider>
            <APIServiceProvider>
              <SidebarProvider>
                <>
                  <AuthorizedRoute
                    exact
                    path={RoutesEnum.HOME}
                    component={Home}
                  />
                  <AuthorizedRoute
                    exact
                    path={RoutesEnum.DASHBOARD}
                    component={Dashboard}
                    isPrivate
                  />
                  <AuthorizedRoute
                    exact
                    path={RoutesEnum.PROJECTS}
                    component={Projects}
                    isPrivate
                  />
                  <AuthorizedRoute component={() => <Redirect to="/" />} />
                </>
              </SidebarProvider>
            </APIServiceProvider>
          </SessionProvider>
        </LanguageProvider>
      </Switch>
    </BrowserRouter>
  );
}
