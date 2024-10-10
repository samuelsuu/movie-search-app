import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// for drawer nav
import { createDrawerNavigator } from '@react-navigation/drawer';

// for tobtab nav
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// for bottom nav
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen'; // your custom screen
import DetailScreen from './screens/DetailScreen'; // your custom screen
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; // Import vector icons

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();



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

    // Drawer.......
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <NavigationContainer >
    //     <Drawer.Navigator initialRouteName="Home">
    //       <Drawer.Screen name="Home" component={HomeScreen} options={{title: "SU Movies Search"}}/>
    //       <Drawer.Screen name="Detail" component={DetailScreen} options={{title: "Movie Detail"}}/>
    //     </Drawer.Navigator>
    //   </NavigationContainer>
    // </GestureHandlerRootView>

    // toptab
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        style={{paddingTop: 30,}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'search'; // Icon for Home Screen
            } else if (route.name === 'Detail') {
              iconName = 'movie'; // Icon for Detail Screen
            }

            return <MaterialIcons name={iconName} size={22} color={color} />;
          },
          tabBarLabelStyle: { fontSize: 12, paddingTop: 7, }, // customize the label
          tabBarStyle: { backgroundColor: '#0031E7'  }, // Customize tab bar style
          tabBarActiveTintColor: 'white', // Active tab icon color
          tabBarInactiveTintColor: 'gray', // Inactive tab icon color
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'SU Movies Search' }}
        />
        <Tab.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Movie Detail' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </GestureHandlerRootView>
  );
}
