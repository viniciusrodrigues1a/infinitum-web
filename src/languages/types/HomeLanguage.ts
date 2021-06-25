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
};

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
};
