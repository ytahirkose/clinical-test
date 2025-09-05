import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import locales from '../locales';

const resources = {
  tr: { translation: locales.tr },
  en: { translation: locales.en },
  ar: { translation: locales.ar },
  fr: { translation: locales.fr },
  it: { translation: locales.it },
  es: { translation: locales.es },
  pt: { translation: locales.pt },
  ru: { translation: locales.ru },
  zh: { translation: locales.zh },
  de: { translation: locales.de },
  nl: { translation: locales.nl },
  pl: { translation: locales.pl },
  hu: { translation: locales.hu },
};

const LANGUAGE_KEY = '@language';

const getDeviceLanguage = (): string => {
  try {
    let locale: string | undefined;
    if (typeof navigator !== 'undefined' && navigator && navigator.language) {
      locale = navigator.language as string;
    }
    if (!locale && typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      locale = Intl.DateTimeFormat().resolvedOptions().locale;
    }
    const code = (locale || 'en').toLowerCase().split('-')[0];
    const supported = Object.keys(resources);
    return supported.includes(code) ? code : 'en';
  } catch {
    return 'en';
  }
};

const detectLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && resources[savedLanguage as keyof typeof resources]) {
      return savedLanguage;
    }
    const detected = getDeviceLanguage();
    await AsyncStorage.setItem(LANGUAGE_KEY, detected);
    return detected;
  } catch (error) {
    return 'en';
  }
};

export const changeLanguage = async (languageCode: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    await i18n.changeLanguage(languageCode);
  } catch (error) {
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

detectLanguage().then((language) => {
  i18n.changeLanguage(language);
});

export default i18n;
