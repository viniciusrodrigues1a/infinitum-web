/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import RoutesEnum from "./type-defs/RoutesEnum";

type AuthorizedRouteProps = {
  isPrivate?: boolean;
  component: () => React.ReactElement;
};

AuthorizedRoute.defaultProps = {
  isPrivate: false,
};

export default function AuthorizedRoute({
  isPrivate,
  component: Component,
  ...rest
}: RouteProps & AuthorizedRouteProps): React.ReactElement {
  const session = useContext(SessionContext);

  if (session.isReady && session.isSignedIn() && !isPrivate) {
    return <Redirect to={RoutesEnum.DASHBOARD} />;
  }

  if (session.isReady && !session.isSignedIn() && isPrivate) {
    return <Redirect to={RoutesEnum.HOME} />;
  }

  return (
    <Route
      {...rest}
      render={() =>
        isPrivate ? (
          <AuthenticatedLayout>
            <Component />
          </AuthenticatedLayout>
        ) : (
          <Component />
        )
      }
    />
  );
}
