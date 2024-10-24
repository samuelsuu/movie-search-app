// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from './models/ThemeContext'; // Import ThemeProvider
import MainNavigator from './navigation/MainNavigator'; // Import the separated MainNavigator

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
