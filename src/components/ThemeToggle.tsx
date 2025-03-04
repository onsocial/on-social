// src/@components/ThemeToggle.tsx
import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '@contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@assets/icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={toggleTheme} className="absolute right-5 top-8">
      {theme === 'dark' ? <SunIcon size={24} /> : <MoonIcon size={24} />}
    </TouchableOpacity>
  );
};

export default ThemeToggle;
