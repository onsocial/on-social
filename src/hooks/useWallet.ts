import { useState, useEffect } from 'react';
import { initializeWalletSelector } from '@utils/wallet';
import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import { useRouter } from 'expo-router';

export function useWallet() {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('useWallet initializing');
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
          router.replace('/home');
        }
      })
      .catch((error) => console.error('Failed to initialize wallet:', error));
  }, []);

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
      throw error; // Let caller handle error
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
      router.replace('/'); // Force redirect
      throw error;
    }
  };

  return {
    wallet,
    accountId,
    isConnecting,
    isDisconnecting,
    connectWallet,
    disconnectWallet,
  };
}
