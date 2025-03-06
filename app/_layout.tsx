import { ThemeProvider } from '@contexts/ThemeContext';
import { Slot } from 'expo-router';
import { WalletProvider } from '@contexts/WalletContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Slot />
      </WalletProvider>
    </ThemeProvider>
  );
}
