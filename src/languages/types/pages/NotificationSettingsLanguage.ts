export type NotificationSettingsLanguage = {
  title: string;
  subtitle: string;

  preferences: {
    invitation: string;
    kicked: string;
    roleUpdated: string;
    issueAssigned: string;
  };

  updateButtonText: string;

  successMessage: string;
  failureMessage: string;
};
