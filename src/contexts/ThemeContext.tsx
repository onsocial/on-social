import React, { createContext, useState, useEffect, useMemo } from 'react';
import { View, SafeAreaView, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
          setTheme(storedTheme);
        } else {
          const systemTheme = Appearance.getColorScheme();
          setTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Failed to load theme from AsyncStorage:', error);
        setTheme('light'); // Fallback to light theme
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });

    return () => subscription.remove();
  }, []);

  // Save the selected theme to AsyncStorage whenever it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Failed to save theme to AsyncStorage:', error);
      }
    };

    saveTheme();
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Use useMemo to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <SafeAreaView className={`${theme === 'dark' ? 'dark' : ''} flex-1`}>
        {children}
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};
