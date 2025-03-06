import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accountId: string | null;
  setAccountId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accountId, setAccountId] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ accountId, setAccountId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
