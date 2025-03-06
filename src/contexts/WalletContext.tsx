import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import { initializeWalletSelector } from '@utils/wallet';
import { useRouter } from 'expo-router';

interface WalletContextType {
  selector: WalletSelector | null;
  wallet: Wallet | null;
  accountId: string | null;
  setAccountId: (id: string | null) => void; // Add setter to interface
  isConnecting: boolean;
  isDisconnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('WalletProvider initializing');
    initializeWalletSelector()
      .then(async (sel) => {
        setSelector(sel);
        if (sel.isSignedIn()) {
          const w = await sel.wallet();
          setWallet(w);
          const accounts = await w.getAccounts();
          setAccountId(accounts[0]?.accountId || null);
          console.log(
            'Wallet initialized with account:',
            accounts[0]?.accountId,
          );
          router.replace('/(tabs)/home');
        }
      })
      .catch((error) => console.error('Failed to initialize wallet:', error));
  }, [router]);

  const connectWallet = async () => {
    if (!selector || isConnecting) return;
    setIsConnecting(true);
    try {
      const walletInstance = await selector.wallet('bitte-wallet');
      await walletInstance.signIn({
        contractId: 'social.near',
        methodNames: [],
        accounts: [],
      });
      setWallet(walletInstance);
      const accounts = await walletInstance.getAccounts();
      setAccountId(accounts[0]?.accountId || null);
      console.log('Wallet connected:', accounts[0]?.accountId);
      setIsConnecting(false);
      // Redirect handled by wallet-callback.tsx
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      setIsConnecting(false);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    if (!wallet || !selector || isDisconnecting) return;
    setIsDisconnecting(true);
    try {
      await wallet.signOut();
      setWallet(null);
      setAccountId(null);
      setIsDisconnecting(false);
      router.replace('/');
      console.log('Wallet disconnected and redirected to /');
    } catch (error: any) {
      console.error('Disconnect failed:', error);
      setIsDisconnecting(false);
      setAccountId(null);
      router.replace('/');
      throw error;
    }
  };

  const value = {
    selector,
    wallet,
    accountId,
    setAccountId, // Include setter in context value
    isConnecting,
    isDisconnecting,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};
