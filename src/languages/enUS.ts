/* eslint-disable import/prefer-default-export */
import Language from "./types";

export const enUS: Language = {
  libs: {
    axios: {
      unexpectedErrorMessage: "Something went wrong",
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
        title1: "Manage everything in one workspace",
        description1:
          "Planning, tracking, and delivering your team’s best work has never been easier.",
        title2: "Set up in minutes",
        description2:
          "Get started fast with hundreds of visual and customizable templates - or create your own.",
      },
      views: {
        title: ["Track your effort with different", "views"],
        description:
          "View data as a map, calendar, timeline, kanban, and more.",
      },
      footer: {
        contactUs: "Contact Us",
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
      viewOptionList: "List",
      viewOptionKanban: "Kanban",
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
        cancelButtonText: "Close",
        updateButtonText: "Update",
      },
    },
  },
  components: {
    sidebar: {
      homeItemName: "Home",
      projectsItemName: "Projects",
      settingsItemName: "Settings",
    },
  },
  validation: {
    emptyFields: "Fill the empty fields with your information",
    passwordDoesntMatchConfirmation:
      "Password doesn't match confirmation password",
  },
};
