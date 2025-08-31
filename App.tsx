import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';

import './src/config/i18n';
import HomeScreen from './src/screens/HomeScreen';
import TestSelectionScreen from './src/screens/TestSelectionScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import TestScreen from './src/screens/TestScreen';
import ResultScreen from './src/screens/ResultScreen';
import LanguageSelector from './src/components/LanguageSelector';
import { UserSelection, TestType } from './src/types';
import { useTranslation } from 'react-i18next';

export type RootStackParamList = {
  Home: undefined;
  TestSelection: undefined;
  Disclaimer: { userSelection: UserSelection };
  Test: { userSelection: UserSelection; testType: TestType };
  Result: { score: number; answers: number[]; testType: TestType; userSelection: UserSelection };
};

// Web platformunda uyumlu tema konfigürasyonu
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // İlk açılışta dil seçimi kontrolü
    const checkFirstLaunch = async () => {
      try {
        const hasSelectedLanguage = await AsyncStorage.getItem('@language');
        if (hasSelectedLanguage) {
          setShowLanguageSelector(false);
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    checkFirstLaunch();

    // AdMob konfigürasyonu ve başlatma
    if (mobileAds && MaxAdContentRating) {
      try {
        mobileAds()
          .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.PG,
            tagForChildDirectedTreatment: false,
            tagForUnderAgeOfConsent: false,
            testDeviceIdentifiers: ['EMULATOR', 'YOUR_DEVICE_ID'] // Gerçek cihaz ID'si ekle
          })
          .then(() => mobileAds().initialize());
      } catch (error) {
        console.log('AdMob initialization failed:', error);
      }
    }

    // Ekran yönlendirmesi kilitleme
    if (Platform.OS !== 'web') {
      const lockOrientation = async () => {
        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } catch (error) {
          // Orientation lock failed silently
        }
      };
      lockOrientation();
    }
  }, []);

  const handleLanguageSelect = (language: string) => {
    setShowLanguageSelector(false);
    setIsFirstLaunch(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={CombinedDefaultTheme}>
          <NavigationContainer theme={CombinedDefaultTheme}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#6200ee',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: '' }}
              />
              <Stack.Screen
                name="TestSelection"
                component={TestSelectionScreen}
                options={{ title: t('testSelection.title') }}
              />
              <Stack.Screen
                name="Disclaimer"
                component={DisclaimerScreen}
                options={{ title: t('disclaimer.title') }}
              />
              <Stack.Screen
                name="Test"
                component={TestScreen}
                options={{ title: t('test.question') }}
              />
              <Stack.Screen
                name="Result"
                component={ResultScreen}
                options={{ title: t('result.title') }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          
          {/* LanguageSelector'ı PaperProvider içinde, NavigationContainer dışında */}
          <LanguageSelector
            visible={showLanguageSelector}
            onLanguageSelect={handleLanguageSelect}
          />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
