import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import TestSelectionScreen from './src/screens/TestSelectionScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import TestScreen from './src/screens/TestScreen';
import ResultScreen from './src/screens/ResultScreen';

export type RootStackParamList = {
  Home: undefined;
  TestSelection: undefined;
  Disclaimer: { userSelection: any };
  Test: { userSelection: any; testType: any };
  Result: { score: number; answers: number[]; testType: any; userSelection: any };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
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
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#988888',
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
              options={{ title: 'DEHB Tespit' }}
            />
            <Stack.Screen
              name="TestSelection"
              component={TestSelectionScreen}
              options={{ title: 'Test Seçimi' }}
            />
            <Stack.Screen
              name="Disclaimer"
              component={DisclaimerScreen}
              options={{ title: 'Önemli Uyarı' }}
            />
            <Stack.Screen
              name="Test"
              component={TestScreen}
              options={{ title: 'Test' }}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
              options={{ title: 'Test Sonucu' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
