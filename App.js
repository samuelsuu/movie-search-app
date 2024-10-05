import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen'; // your custom screen
import DetailScreen from './screens/DetailScreen'; // your custom screen
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();


// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    const hideSplashScreen = async () => {
      // Simulate some loading task or app initialization
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Hide the splash screen after the app is ready
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} options={{title: "SU Movies Search"}}/>
          <Drawer.Screen name="Detail" component={DetailScreen} options={{title: "Movie Detail"}}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
