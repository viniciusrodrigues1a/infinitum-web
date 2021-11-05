export type ProjectsLanguage = {
  headerTitle: string;

  filter: {
    allProjects: string;
  };

  buttonText: string;

  table: {
    projectNameTitle: string;
    progressTitle: string;
    statusTitle: string;
    ownershipTitle: string;
    startDateTitle: string;
    endDateTitle: string;
  };

  emptyProjectsText: string;

  createModal: {
    title: string;
    subtitle: string;

    titleInputLabel: string;
    titleInputDescription: string;
    titleInputPlaceholder: string;

    dateInputLabel: string;
    dateInputDescription: string;

    descriptionInputLabel: string;
    descriptionInputDescription: string;
    descriptionInputPlaceholder: string;

    submitButtonText: string;
  };
};
