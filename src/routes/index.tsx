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
import { DateFormatterProvider } from "../contexts/DateFormatterContext";
import { ProjectsProvider } from "../contexts/ProjectsContext";

export default function Routes(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <LanguageProvider>
          <DateFormatterProvider>
            <SessionProvider>
              <APIServiceProvider>
                <SidebarProvider>
                  <>
                    <AuthorizedRoute
                      exact
                      path={RoutesEnum.HOME}
                      component={Home}
                    />
                    <ProjectsProvider>
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
                    </ProjectsProvider>
                  </>
                </SidebarProvider>
              </APIServiceProvider>
            </SessionProvider>
          </DateFormatterProvider>
        </LanguageProvider>
      </Switch>
    </BrowserRouter>
  );
}
