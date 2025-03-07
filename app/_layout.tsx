import React from 'react';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@contexts/ThemeContext';
import { WalletProvider } from '@contexts/WalletContext';
import { TransactionProvider } from '@contexts/TransactionContext';
import { Buffer } from 'buffer';
// Remove direct import of TabLayout
// import TabLayout from './(tabs)/_layout';

if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

const RootLayout: React.FC = () => {
  return (
    <ThemeProvider>
      <WalletProvider>
        <TransactionProvider>
          <Slot /> {/* Ensure Slot is used to render the appropriate layout */}
        </TransactionProvider>
      </WalletProvider>
    </ThemeProvider>
  );
};

export default RootLayout;