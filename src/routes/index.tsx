import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import AuthorizedRoute from "./AuthorizedRoute";
import RoutesEnum from "./type-defs/RoutesEnum";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";

export default function Routes(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <AuthorizedRoute exact path={RoutesEnum.HOME} component={Home} />
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
      </Switch>
    </BrowserRouter>
  );
}
