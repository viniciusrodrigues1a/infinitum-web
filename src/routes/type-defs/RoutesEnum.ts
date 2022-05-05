enum RoutesEnum {
  HOME = "/",
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  PROJECTS = "/projects",
  PROJECT = "/project/:projectId",
  ACCEPT_INVITATION = "/invitation/:invitationToken",
  REVOKE_INVITATION = "/revoke/:projectId",
  NOTIFICATION_PREFERENCES = "/notifications",
}

export default RoutesEnum;
