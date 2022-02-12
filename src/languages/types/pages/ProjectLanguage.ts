export type ProjectLanguage = {
  newCardButtonText: string;

  updateIssueGroupInputText: string;

  membersButtonText: string;

  projectNotFoundText: string;

  projectNotFoundButtonText: string;

  createIssueModal: {
    title: string;
    subtitle: string;

    titleInputLabel: string;
    titleInputDescription: string;
    titleInputPlaceholder: string;

    expiringDateInputLabel: string;
    expiringDateInputDescription: string;

    sectionInputLabel: string;
    sectionInputDescription: string;
    sectionInputPlaceholder: string;

    descriptionInputLabel: string;
    descriptionInputDescription: string;
    descriptionInputPlaceholder: string;

    submitButtonText: string;
  };

  issueModal: {
    title: string;
    subtitle: string;

    assignedInputLabel: string;
    assignedInputPlaceholder: string;

    cancelButtonText: string;
    updateButtonText: string;
  };

  views: {
    list: {
      titleTableHeader: string;
      conclusionDateTableHeader: string;
      option: string;
      newIssue: string;
      newSection: string;
      newIssuePlaceholder: string;
      newSectionPlaceholder: string;
    };
    kanban: {
      option: string;
      newIssue: string;
      newSection: string;
      newIssuePlaceholder: string;
      newSectionPlaceholder: string;
    };
  };
};
