/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";

type AuthorizedRouteProps = {
  isPrivate?: boolean;
};

AuthorizedRoute.defaultProps = {
  isPrivate: false,
};

export default function AuthorizedRoute({
  isPrivate,
  ...rest
}: RouteProps & AuthorizedRouteProps): React.ReactElement {
  const session = useContext(SessionContext);

  if (session.isSignedIn() && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  if (!session.isSignedIn() && isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}
