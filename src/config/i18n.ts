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

const detectLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && resources[savedLanguage as keyof typeof resources]) {
      return savedLanguage;
    }
    return 'en'; // Varsayılan dil İngilizce
  } catch (error) {
    console.error('Dil algılama hatası:', error);
    return 'en'; // Varsayılan dil İngilizce
  }
};

export const changeLanguage = async (languageCode: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    await i18n.changeLanguage(languageCode);
  } catch (error) {
    console.error('Dil değiştirme hatası:', error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Varsayılan dil İngilizce
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

// Uygulama başladığında kaydedilmiş dili yükle
detectLanguage().then((language) => {
  i18n.changeLanguage(language);
});

export default i18n;
