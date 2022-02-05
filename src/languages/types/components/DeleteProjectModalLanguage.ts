export type DeleteProjectModalLanguage = {
  title: string;
  warningText: string;
  description: (projectName: string) => string;

  inputConfirmationText: string;
  inputPlaceholder: string;

  cancelButtonText: string;
  deleteButtonText: string;
};
