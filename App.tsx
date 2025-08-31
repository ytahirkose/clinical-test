import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './src/screens/HomeScreen';
import TestSelectionScreen from './src/screens/TestSelectionScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import TestScreen from './src/screens/TestScreen';
import ResultScreen from './src/screens/ResultScreen';
import { UserSelection, TestType } from './src/types';

export type RootStackParamList = {
  Home: undefined;
  TestSelection: undefined;
  Disclaimer: { userSelection: UserSelection };
  Test: { userSelection: UserSelection; testType: TestType };
  Result: { score: number; answers: number[]; testType: TestType; userSelection: UserSelection };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
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
    </GestureHandlerRootView>
  );
}
