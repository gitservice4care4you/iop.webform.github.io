let appLanguage: string;

export const getAppLanguage = (): string => {
  return appLanguage;
};

export const setAppLanguage = (newLanguage: string): void => {
  appLanguage = newLanguage;
};
