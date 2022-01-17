/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import RoutesEnum from "./type-defs/RoutesEnum";

type AuthorizedRouteProps = {
  isPrivate?: boolean;
  component: () => React.ReactElement;
  showAuthorizedLayout?: boolean;
};

AuthorizedRoute.defaultProps = {
  isPrivate: false,
  showAuthorizedLayout: true,
};

export default function AuthorizedRoute({
  isPrivate,
  component: Component,
  showAuthorizedLayout,
  ...rest
}: RouteProps & AuthorizedRouteProps): React.ReactElement {
  const session = useContext(SessionContext);

  useEffect(() => {
    console.log("Ready: ", session.isReady);
    console.log("isSignedIn: ", session.isReady);
    console.log("isPrivate: ", isPrivate);
    console.log("");
  }, [session, isPrivate]);

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
        isPrivate && showAuthorizedLayout ? (
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
