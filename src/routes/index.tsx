import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

export default function Routes(): React.ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <AuthorizedRoute exact path="/" component={Home} />
        <AuthorizedRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isPrivate
        />
        <AuthorizedRoute component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}