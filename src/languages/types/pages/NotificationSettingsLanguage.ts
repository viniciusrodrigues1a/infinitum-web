export type NotificationSettingsLanguage = {
  title: string;
  subtitle: string;

  preferences: {
    invitation: string;
    kicked: string;
    roleUpdated: string;
    issueAssigned: string;
    projectDeleted: string;
    roleUpdatedAdmin: string;
    kickedAdmin: string;
  };

  updateButtonText: string;

  successMessage: string;
  failureMessage: string;
};
