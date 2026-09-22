import { createContext, useContext } from 'react';

export const LanguageContext = createContext({ language: 'English', setLanguage: () => {} });

export function useLanguage() {
  return useContext(LanguageContext);
}
