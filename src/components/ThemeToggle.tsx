import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Use Ionicons for moon and sun icons
import { ThemeContext } from '@contexts/ThemeContext'; // Import the theme context

const ThemeToggle: React.FC = () => {
  // Access the current theme and toggle function from the context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{ position: 'absolute', top: 30, right: 20 }}
    >
      {/* Display Moon icon for dark mode and Sun icon for light mode */}
      <Ionicons
        name={theme === 'dark' ? 'sunny' : 'moon'}
        size={26}
        color={theme === 'dark' ? 'white' : 'black'}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;
