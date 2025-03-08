// app/_layout.tsx
import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@contexts/ThemeContext';
import { TransactionProvider } from '@contexts/TransactionContext';
import { store, persistor } from '@store/index';
import { Buffer } from 'buffer';
import { walletService } from '@services/wallet';

const queryClient = new QueryClient();

if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

const RootLayout: React.FC = () => {
  useEffect(() => {
    walletService.initialize(); // Restore wallet state on app load
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <TransactionProvider>
              <Slot />
            </TransactionProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;