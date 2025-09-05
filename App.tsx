import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

let mobileAds: any = null;
let MaxAdContentRating: any = null;
try {
  const admob = require('react-native-google-mobile-ads');
  mobileAds = admob.default;
  MaxAdContentRating = admob.MaxAdContentRating;
} catch {}
import AsyncStorage from '@react-native-async-storage/async-storage';

import './src/config/i18n';
import HomeScreen from './src/screens/HomeScreen';
import TestSelectionScreen from './src/screens/TestSelectionScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import TestScreen from './src/screens/TestScreen';
import ResultScreen from './src/screens/ResultScreen';
import { UserSelection, TestType } from './src/types';
import { useTranslation } from 'react-i18next';

export type RootStackParamList = {
  Home: undefined;
  TestSelection: undefined;
  Disclaimer: { userSelection: UserSelection };
  Test: { userSelection: UserSelection; testType: TestType };
  Result: { score: number; answers: number[]; testType: TestType; userSelection: UserSelection };
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  fonts: MD3LightTheme.fonts,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasSelectedLanguage = await AsyncStorage.getItem('@language');
        if (hasSelectedLanguage) {
          setIsFirstLaunch(false);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();

    if (mobileAds && MaxAdContentRating) {
      try {
        mobileAds()
          .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.PG,
            tagForChildDirectedTreatment: false,
            tagForUnderAgeOfConsent: false,
            testDeviceIdentifiers: ['EMULATOR', 'YOUR_DEVICE_ID']
          })
          .then(() => mobileAds().initialize());
      } catch (error) {
      }
    } else {
    }

    if (Platform.OS !== 'web') {
      const lockOrientation = async () => {
        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } catch (error) {
        }
      };
      lockOrientation();
    }
  }, []);


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

        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
