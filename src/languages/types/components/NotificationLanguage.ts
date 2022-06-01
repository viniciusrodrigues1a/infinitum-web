export type NotificationLanguage = {
  invitation: {
    acceptText: string;
    denyText: string;
    message: (projectName: string) => string;
  };
  kicked: {
    message: (projectName: string) => string;
  };
  kickedAdmin: {
    message: (projectName: string, emailKicked: string) => string;
  };
  projectDeleted: {
    message: (projectName: string) => string;
  };
  roleUpdated: {
    message: (projectName: string, roleName: string) => string;
  };
  roleUpdatedAdmin: {
    message: (
      projectName: string,
      roleName: string,
      emailWhoseRoleHasBeenUpdated: string
    ) => string;
  };
  issueAssigned: {
    message: (issueTitle: string) => string;
  };
};
