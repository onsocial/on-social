import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ThemeContext } from '@contexts/ThemeContext'; // Import the theme context

// Define SVG icons for sun and moon
const SunIcon = () => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3v1.5m0 15V21m-4.5-9H3m3.75-6.364L5.636 5.636M18.75 5.636L18.364 5.25M21 12h-1.5m-3.75 6.364l.386.386M12 18a6 6 0 100-12 6 6 0 000 12z"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MoonIcon = () => (
  <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ThemeToggle: React.FC = () => {
  // Access the current theme and toggle function from the context
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="absolute top-8 right-5"
    >
      {theme === 'dark' ? (
        <SunIcon fill={theme === 'dark' ? 'white' : 'black'} />
      ) : (
        <MoonIcon fill={theme === 'dark' ? 'white' : 'black'} />
      )}
    </TouchableOpacity>
  );
};

export default ThemeToggle;