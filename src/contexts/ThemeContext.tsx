import React, { createContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load theme from AsyncStorage when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme'); // Retrieve saved theme
      if (storedTheme) {
        setTheme(storedTheme as 'light' | 'dark');
      } else {
        // Use the system theme if no theme is stored
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme || 'light');
      }
    };

    loadTheme();
  }, []);

  // Save the selected theme to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('theme', theme); // Save theme to AsyncStorage
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Apply the correct theme to the root View */}
      <View className={`${theme === 'dark' ? 'dark' : ''} flex-1`}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
