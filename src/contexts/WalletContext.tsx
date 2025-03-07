import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import { initializeWalletSelector } from '../utils/wallet';
import { useRouter } from 'expo-router';

interface WalletContextType {
  selector: WalletSelector | null;
  wallet: Wallet | null;
  accountId: string | null;
  setAccountId: (id: string | null) => void;
  isConnecting: boolean;
  isDisconnecting: boolean;
  connectWallet: () => Promise<Wallet | null>;
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
          console.log('Wallet initialized with account:', accounts[0]?.accountId);
          router.replace('/(tabs)/home');
        }
      })
      .catch((error) => console.error('Failed to initialize wallet:', error));
  }, [router]);

  const connectWallet = async () => {
    if (!selector || isConnecting) return null;
    setIsConnecting(true);
    try {
      const walletInstance = await selector.wallet('bitte-wallet');
      await walletInstance.signIn({
        contractId: 'social.near',
        methodNames: [],
        accounts: [], // Added to satisfy HardwareWalletSignInParams
      });
      setWallet(walletInstance);
      const accounts = await walletInstance.getAccounts();
      setAccountId(accounts[0]?.accountId || null);
      console.log('Wallet connected:', accounts[0]?.accountId);
      router.replace('/(tabs)/home');
      return walletInstance;
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (!wallet || !selector || isDisconnecting) return;
    setIsDisconnecting(true);
    try {
      await wallet.signOut();
      setWallet(null);
      setAccountId(null);
      router.replace('/');
      console.log('Wallet disconnected');
    } catch (error: any) {
      console.error('Disconnect failed:', error);
      router.replace('/');
      throw error;
    } finally {
      setIsDisconnecting(false);
    }
  };

  const value = {
    selector,
    wallet,
    accountId,
    setAccountId,
    isConnecting,
    isDisconnecting,
    connectWallet,
    disconnectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};