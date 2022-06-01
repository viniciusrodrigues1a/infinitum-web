import Language from "./types";

/* eslint-disable-next-line import/prefer-default-export */
export const enUS: Language = {
  libs: {
    axios: {
      unexpectedErrorMessage: "Something went wrong",
      sessionExpired: "Session expired",
    },
  },
  pages: {
    home: {
      introduction: {
        title: "Have no limits, be Infinitum.",
        description:
          "Expand your horizon amidst the cosmos. Manage projects with the highest productivity wherever you are.",
      },
      pitch: {
        title: ["Check out more about our", "work"],
      },
      showcase: {
        title1: "Be in control of everything",
        description1: "Visualize all of your progress in one place.",
        title2: "Quick set up",
        description2:
          "Get started fast with a simple and easy to use interface.",
      },
      views: {
        title: ["Track your effort with different", "views"],
        description: "View data as a list, kanban, and more.",
      },
      footer: {
        modal: {
          title: "Choose a language",
        },
      },
      signInText: "Sign In",
      signUpText: "Sign Up",
      signUpGoogleText: "Sign in with Google",
      signUpEmailText: "Sign in with Email",
      languageButtonText: "Language",
      signUpModal: {
        title: "Create your account",
        buttonTitle: "Sign up",
        alternativeTitle: ["Already have an account?", "Sign in"],
        nameInputPlaceholder: "Name",
        emailInputPlaceholder: "Email",
        passwordInputPlaceholder: "Password",
        passwordConfirmationInputPlaceholder: "Password confirmation",
      },
      signInModal: {
        title: "Sign in with your account",
        buttonTitle: "Sign in",
        alternativeTitle: ["Don't have an account?", "Sign up"],
        emailInputPlaceholder: "Email",
        passwordInputPlaceholder: "Password",
      },
      accountCreatedSuccessfully: "Account created succesfully",
    },
    dashboard: {
      headerTitle: "Home page",
      overviewError:
        "There was an error trying to retrieve your information. Try reloading the page.",
      card1: {
        title: "Completed tickets",
        option1: "Week",
        option2: "Month",
        option3: "Year",
      },
      card2: {
        title: "My tickets",
        subtitle: "All tickets assigned to you",
        getTotalTicketsFormattedMessage: (total: number) =>
          `of ${total} tickets`,
        getTicketsLeftFormattedMessage: (ticketsLeft: number) =>
          `${ticketsLeft} remaining`,
      },
      card3: {
        title: "My tickets for today",
        subtitle: "All tickets assigned to you that expire today",
        moreInfo: "See all tickets",
      },
      card4: {
        title: "My expired tickets",
        subtitle: "All tickets assigned to you that have already expired",
        wordTickets: "tickets",
      },
    },
    projects: {
      headerTitle: "Projects",
      filter: {
        allProjects: "All projects",
      },
      buttonText: "New project",
      table: {
        projectNameTitle: "Project name",
        progressTitle: "Progress",
        statusTitle: "Status",
        ownershipTitle: "Owner",
        startDateTitle: "Start date",
        endDateTitle: "End date",
      },
      emptyProjectsText: "You haven't created a project yet",
      createModal: {
        title: "Project creation",
        subtitle: "The first step to realizing your idea",

        titleInputLabel: "Title",
        titleInputDescription:
          "This will be the name used to refer to your project",
        titleInputPlaceholder: "Title",

        dateInputLabel: "Start and end date",
        dateInputDescription: "The lifetime of your project",

        descriptionInputLabel: "Description",
        descriptionInputDescription: "Give a brief description of your project",
        descriptionInputPlaceholder: "Description",

        submitButtonText: "Create",
      },
    },
    project: {
      newCardButtonText: "New card",
      updateIssueGroupInputText: "Mark all tickets moved here as completed?",
      membersButtonText: "Members",
      projectNotFoundText: "This project couldn't be found",
      projectNotFoundButtonText: "Go back to my projects",
      createIssueModal: {
        title: "Ticket creation",
        subtitle: "Fill in the necessary information to create a ticket",

        titleInputLabel: "Title",
        titleInputDescription:
          "This will be the name used to refer to your project",
        titleInputPlaceholder: "Title",

        expiringDateInputLabel: "Date of conclusion",
        expiringDateInputDescription: "The limit date for this ticket",

        sectionInputLabel: "Section",
        sectionInputDescription:
          "To which section of your project this ticket will be a part of",
        sectionInputPlaceholder: "Select a section",

        descriptionInputLabel: "Description",
        descriptionInputDescription: "Give a brief description of your project",
        descriptionInputPlaceholder: "Description",

        submitButtonText: "Create",
      },
      issueModal: {
        title: "Ticket information",
        subtitle: "Verify and update information about this ticket",
        cancelButtonText: "Delete",
        updateButtonText: "Update",
        assignedInputLabel: "Assigned to participant",
        assignedInputPlaceholder: "Assigned to",
      },
      views: {
        list: {
          option: "List",
          titleTableHeader: "Title",
          conclusionDateTableHeader: "End date",
          newIssue: "Add new ticket...",
          newSection: "Add new section...",
          newIssuePlaceholder: "Ticket title",
          newSectionPlaceholder: "Section title",
        },
        kanban: {
          option: "Kanban",
          newIssue: "New card",
          newSection: "New section",
          newIssuePlaceholder: "Ticket title",
          newSectionPlaceholder: "Section title",
        },
      },
    },
    acceptInvitation: {
      title: "Invitation accepted!",
      subtitle: "Redirecting in",
      goBackLink: "Go back to the Dashboard now",
    },
    revokeInvitation: {
      title: "Invitation revoked!",
      subtitle: "Redirecting in",
      goBackLink: "Go back to the Dashboard now",
    },
    profile: {
      nameInputPlaceholder: "Name",
      oldPasswordPlaceholder: "Your current password",
      newPasswordPlaceholder: "Your new password",
      confirmNewPasswordPlaceholder: "Confirm your new password",
      updateButtonText: "Update profile",
      logoutButtonText: "Logout",
      successMessage: "Profile updated succesfully",
      failureMessage: "Your profile couldn't be updated",
    },
    notificationSettings: {
      title: "Notification settings",
      subtitle:
        "Change your settings and the way you'd rather receive your notifications",
      preferences: {
        invitation: "I'm invited to a project",
        kicked: "I'm kicked out of a project",
        roleUpdated: "My role in a project is updated",
        issueAssigned: "I'm assigned an issue",
        projectDeleted: "A project I take part in is deleted",
        kickedAdmin: "A user is kicked out of a project that I manage",
        roleUpdatedAdmin: "A user's role is updated in a project that I manage",
      },
      updateButtonText: "Update your preferences",
      successMessage: "Settings updated sucessfully",
      failureMessage: "Couldn't update your settings",
    },
  },
  components: {
    notification: {
      invitation: {
        denyText: "Deny",
        acceptText: "Accept",
        message: (projectName: string) =>
          `You have been invited to participate in the project: ${projectName}`,
      },
      kicked: {
        message: (projectName: string) =>
          `You have been removed from the project ${projectName} and won't be able to access it on the platform anymore.`,
      },
      kickedAdmin: {
        message: (projectName: string, emailKicked: string) =>
          `The participant ${emailKicked} has been kicked out of the project ${projectName}, of which you're a manager.`,
      },
      roleUpdated: {
        message: (projectName: string, roleName: string) =>
          `Your role in project ${projectName} has been updated to ${roleName}`,
      },
      roleUpdatedAdmin: {
        message: (
          projectName: string,
          roleName: string,
          emailWhoseRoleHasBeenUpdated: string
        ) =>
          `The participant ${emailWhoseRoleHasBeenUpdated} has had their role changed to ${roleName}, in the project ${projectName}, of which you're a manager.`,
      },
      projectDeleted: {
        message: (projectName: string) =>
          `The project ${projectName}, that you were a participant in, has been deleted.`,
      },
      issueAssigned: {
        message: (issueTitle: string) =>
          `You have been assigned the issue ${issueTitle}`,
      },
    },
    header: {
      logoutText: "Logout",
      myProfileText: "My profile",
      noNotificationsText: "Oops. There are no notifications here.",
    },
    sidebar: {
      homeItemName: "Home",
      projectsItemName: "Projects",
      settingsItemName: "Settings",
    },
    updateProjectModal: {
      title: "Your project's configuration",
      subtitle: "Update your project information",
      updateButtonText: "Update",
    },
    deleteProjectModal: {
      title: "Project deletion",
      warningText: "This action cannot be undone",
      description: (projectName: string) =>
        `This will permanently delete the project <strong>${projectName}</strong>, tickets created within that project, and remove all memberships from participating members.`,
      inputConfirmationText: "Type <span>delete</span> to confirm:",
      inputPlaceholder: "delete",
      cancelButtonText: "Cancel",
      deleteButtonText: "Delete",
    },
    manageParticipantsModal: {
      title: "Members management",
      subtitle: "Manage the permissions of your project members",
      userTableHeader: "Participant",
      roleTableHeader: "Role",
      espectatorRole: "Espectator",
      memberRole: "Member",
      adminRole: "Admin",
      ownerRole: "Owner",
      pendingText: "Pending",
      inviteMembersButtonText: "Invite other users",
    },
    deleteParticipantConfirmationModal: {
      title: "Remove participant from project?",
      subtitle: (email: string) =>
        `The user <span>${email}</span> will be removed from the project`,
      cancelButtonText: "Cancel",
      deleteParticipantButtonText: "Remove",
    },
    addParticipantsModal: {
      title: "Invite users",
      subtitle: "Invite users to your project",
      inputPlaceholder: "User email",
      buttonText: "Send invitations",
    },
  },
  validation: {
    emptyFields: "Fill the empty fields with your information",
    passwordDoesntMatchConfirmation:
      "Password doesn't match confirmation password",
  },
};
