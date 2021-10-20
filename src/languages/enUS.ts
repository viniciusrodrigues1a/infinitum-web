/* eslint-disable import/prefer-default-export */
import Language from "./types";

export const enUS: Language = {
  home: {
    introduction: {
      title: "Have no limits, be Infinitum.",
      description:
        "Expand your horizon amid the cosmos. Manage projects with the highest productivity wherever you are.",
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
      description: "View data as a map, calendar, timeline, kanban, and more.",
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
  },
  dashboard: {
    headerTitle: "Home page",
    card1: {
      title: "Completed tickets",
      option1: "Week",
      option2: "Month",
      option3: "Year",
    },
    card2: {
      title: "My tickets",
      subtitle: "All tickets assigned to you",
      getTotalTicketsFormattedMessage: (total: number) => `of ${total} tickets`,
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
  sidebar: {
    homeItemName: "Home",
    projectsItemName: "Projects",
  },
};
