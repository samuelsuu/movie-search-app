import React, { createContext, useState } from 'react';
import { Appearance } from 'react-native'; // Optional: To get system theme

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Optional: Use system theme by default
  const colorScheme = Appearance.getColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
