import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import AuthorizedRoute from "./AuthorizedRoute";
import RoutesEnum from "./type-defs/RoutesEnum";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import AcceptInvitation from "../pages/AcceptInvitation";
import RevokeInvitation from "../pages/RevokeInvitation";
import Profile from "../pages/Profile";
import NotificationSettings from "../pages/NotificationSettings";

import { LanguageProvider } from "../contexts/LanguageContext";
import { SessionProvider } from "../contexts/SessionContext";
import { APIServiceProvider } from "../contexts/APIServiceContext";
import { SidebarProvider } from "../contexts/SidebarContext";
import { DateFormatterProvider } from "../contexts/DateFormatterContext";
import { ProjectsProvider } from "../contexts/ProjectsContext";
import { AccountProvider } from "../contexts/AccountContext";
import { NotificationsProvider } from "../contexts/NotificationsContext";
import SocketProvider from "../contexts/SocketContext";

export default function Routes(): React.ReactElement {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <DateFormatterProvider>
          <SessionProvider>
            <SocketProvider>
              <APIServiceProvider>
                <SidebarProvider>
                  <ProjectsProvider>
                    <AccountProvider>
                      <NotificationsProvider>
                        <Switch>
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
                          <AuthorizedRoute
                            exact
                            path={RoutesEnum.PROJECT}
                            component={Project}
                            isPrivate
                          />
                          <AuthorizedRoute
                            exact
                            path={RoutesEnum.ACCEPT_INVITATION}
                            component={AcceptInvitation}
                            showAuthorizedLayout={false}
                            isPrivate
                          />
                          <AuthorizedRoute
                            exact
                            path={RoutesEnum.REVOKE_INVITATION}
                            component={RevokeInvitation}
                            showAuthorizedLayout={false}
                            isPrivate
                          />
                          <AuthorizedRoute
                            exact
                            path={RoutesEnum.PROFILE}
                            component={Profile}
                            isPrivate
                          />
                          <AuthorizedRoute
                            exact
                            path={RoutesEnum.NOTIFICATION_PREFERENCES}
                            component={NotificationSettings}
                            isPrivate
                          />
                          <AuthorizedRoute
                            component={() => <Redirect to="/" />}
                          />
                        </Switch>
                      </NotificationsProvider>
                    </AccountProvider>
                  </ProjectsProvider>
                </SidebarProvider>
              </APIServiceProvider>
            </SocketProvider>
          </SessionProvider>
        </DateFormatterProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
