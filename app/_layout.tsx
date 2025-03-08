import React from 'react';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@contexts/ThemeContext';
import { WalletProvider } from '@contexts/WalletContext';
import { TransactionProvider } from '@contexts/TransactionContext';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@store/index';
import { Buffer } from 'buffer';

// Ensure Buffer is available globally for Fast Near
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

// Initialize React Query Client
const queryClient = new QueryClient();

const RootLayout: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WalletProvider>
            <TransactionProvider>
              <Slot /> {/* Ensures proper routing */}
            </TransactionProvider>
          </WalletProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
