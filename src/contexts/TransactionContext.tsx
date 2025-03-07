import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Platform } from 'react-native'; // Add this import

interface TransactionState {
  originRoute: string | null;
  transactionType: string | null;
}

interface TransactionContextType {
  setTransactionOrigin: (route: string, type: string) => void;
  getTransactionOrigin: () => TransactionState;
  clearTransactionOrigin: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactionState, setTransactionState] = useState<TransactionState>({
    originRoute: null,
    transactionType: null,
  });

  const setTransactionOrigin = (route: string, type: string) => {
    setTransactionState({ originRoute: route, transactionType: type });
    if (Platform.OS === 'web') {
      localStorage.setItem('transactionOrigin', JSON.stringify({ originRoute: route, transactionType: type }));
    }
  };

  const getTransactionOrigin = (): TransactionState => {
    if (Platform.OS === 'web') {
      const stored = localStorage.getItem('transactionOrigin');
      return stored ? JSON.parse(stored) : transactionState;
    }
    return transactionState;
  };

  const clearTransactionOrigin = () => {
    setTransactionState({ originRoute: null, transactionType: null });
    if (Platform.OS === 'web') {
      localStorage.removeItem('transactionOrigin');
    }
  };

  return (
    <TransactionContext.Provider value={{ setTransactionOrigin, getTransactionOrigin, clearTransactionOrigin }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransaction must be used within TransactionProvider');
  return context;
};