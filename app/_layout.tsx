import { ThemeProvider } from '@contexts/ThemeContext';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
