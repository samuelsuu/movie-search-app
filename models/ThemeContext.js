import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // Get system theme
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  // Function to toggle theme
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light'); // Save the user's preference
  };

  // Load theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setIsDarkMode(storedTheme === 'dark');
        }
      } catch (error) {
        console.log('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
