import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageSelectorProps {
  visible: boolean;
  onLanguageSelect: (languageCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ visible, onLanguageSelect }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const theme = useTheme();

  const languages: LanguageOption[] = [
    { code: 'en', name: t('languages.english'), nativeName: 'English', flag: '🇺🇸' },
    { code: 'tr', name: t('languages.turkish'), nativeName: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: t('languages.arabic'), nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: t('languages.french'), nativeName: 'Français', flag: '🇫🇷' },
    { code: 'it', name: t('languages.italian'), nativeName: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: t('languages.spanish'), nativeName: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: t('languages.portuguese'), nativeName: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: t('languages.russian'), nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: t('languages.chinese'), nativeName: '中文', flag: '🇨🇳' },
    { code: 'de', name: t('languages.german'), nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'nl', name: t('languages.dutch'), nativeName: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', name: t('languages.polish'), nativeName: 'Polski', flag: '🇵🇱' },
    { code: 'hu', name: t('languages.hungarian'), nativeName: 'Magyar', flag: '🇭🇺' },
  ];

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      setSelectedLanguage(languageCode);
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem('@language', languageCode);
      onLanguageSelect(languageCode);
    } catch (e) {
      onLanguageSelect(languageCode);
    }
  };

  // Görünür değilse hiçbir şey render etme
  // Modal ile yönetilecek

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => onLanguageSelect(selectedLanguage)}>
      <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          {t('languageSelector.title')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          {t('languageSelector.subtitle')}
        </Text>

        <ScrollView style={styles.languageList} showsVerticalScrollIndicator={false}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                selectedLanguage === language.code && {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <Text style={styles.flag}>{language.flag}</Text>
              <View style={styles.languageInfo}>
                <Text
                  style={[
                    styles.languageName,
                    { color: theme.colors.onSurface },
                    selectedLanguage === language.code && {
                      color: theme.colors.onPrimaryContainer,
                    },
                  ]}
                >
                  {language.nativeName}
                </Text>
                <Text
                  style={[
                    styles.languageNameEn,
                    { color: theme.colors.onSurfaceVariant },
                    selectedLanguage === language.code && {
                      color: theme.colors.onPrimaryContainer,
                      opacity: 0.7,
                    },
                  ]}
                >
                  {language.name}
                </Text>
              </View>
              {selectedLanguage === language.code && (
                <Text style={[styles.checkmark, { color: theme.colors.onPrimaryContainer }]}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => onLanguageSelect(selectedLanguage)}
        >
          <Text style={[styles.continueButtonText, { color: theme.colors.onPrimary }]}>
            {t('languageSelector.continue')}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    margin: 20,
    maxHeight: '80%',
    minWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  languageList: {
    maxHeight: 400,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  flag: {
    fontSize: 24,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  languageNameEn: {
    fontSize: 14,
    opacity: 0.7,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  continueButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LanguageSelector;
