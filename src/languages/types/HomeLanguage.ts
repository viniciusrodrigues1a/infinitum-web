type HomeIntroductionLanguage = {
  title: string;
  description: string;
};

type HomePitchLanguage = {
  title: string[];
};

type HomeShowcaseLanguage = {
  title1: string;
  description1: string;
  title2: string;
  description2: string;
};

type HomeViewsLanguage = {
  title: string[];
  description: string;
};

type HomeFooterLanguage = {
  contactUs: string;
  modal: {
    title: string;
  };
};

type HomeBaseModalLanguage = {
  title: string;
  buttonTitle: string;
  alternativeTitle: string[];
  emailInputPlaceholder: string;
  passwordInputPlaceholder: string;
};

type SignUpModalLanguage = HomeBaseModalLanguage & {
  nameInputPlaceholder: string;
  passwordConfirmationInputPlaceholder: string;
};

type SignInModalLanguage = HomeBaseModalLanguage;

export type HomeLanguage = {
  introduction: HomeIntroductionLanguage;
  pitch: HomePitchLanguage;
  showcase: HomeShowcaseLanguage;
  views: HomeViewsLanguage;
  footer: HomeFooterLanguage;

  signInText: string;
  signUpText: string;
  signUpGoogleText: string;
  signUpEmailText: string;
  languageButtonText: string;

  signUpModal: SignUpModalLanguage;
  signInModal: SignInModalLanguage;
};
