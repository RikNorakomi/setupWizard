export interface Classes {
  [propName: string]: string;
};

export interface SchemeObj {
  primary: Palette;
  secondary: Palette;
  textColorOverride: {
    primary: string | null;
    secondary: string | null;
  }
};

export interface Palette {
  light: string;
  main: string;
  dark: string;
  contrastText: {
    light: string;
    main: string;
    dark: string;
  }
};

export interface UserInput {
  appTopic: string;
  schemeObj: SchemeObj;
  selectedModules: {
    audio: boolean;
    books: boolean;
    events: boolean;
    facebook: boolean;
    instagram: boolean;
    reddit: boolean;
    twitter: boolean;
    video: boolean;
    websites: boolean;
  };
  facebookPage: string;
  instagramPage: string;
  booksQuery: string;
  videoQuery: string;
};
