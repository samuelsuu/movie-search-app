// MainNavigator.js
import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen'; // Import the SettingsScreen
import { ThemeContext } from '../models/ThemeContext'; // Import ThemeContext

const Tab = createMaterialTopTabNavigator();

export default function MainNavigator() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'search';
          } else if (route.name === 'Detail') {
            iconName = 'movie';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={22} color={color} />;
        },
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold', paddingTop: 7 },
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1c1c1c' : '#0031E7',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowColor: '#000',
          elevation: 5, // for Android shadow
        },
        tabBarActiveTintColor: isDarkMode ? '#FFD700' : '#FFFFFF',
        tabBarInactiveTintColor: '#888888',
        tabBarIndicatorStyle: {
          height: 4,
          borderRadius: 10,
          backgroundColor: isDarkMode ? '#FFD700' : '#FFFFFF', // Gold for dark mode, white for light mode
        },
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
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
