export type DeleteParticipantConfirmationModalLanguage = {
  title: string;
  subtitle: (email: string) => string;

  cancelButtonText: string;
  deleteParticipantButtonText: string;
};
