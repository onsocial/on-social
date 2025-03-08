import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWallet, setAccountId, setSelector } from '@store/slices/walletSlice';
import { WalletSelector, setupWalletSelector } from '@near-wallet-selector/core';  // Ensure correct import
import { useRouter } from 'expo-router';
import { RootState } from '@store/index';  // Import RootState for proper state typing
import { useTransaction } from '@contexts/TransactionContext';  // Import your custom TransactionContext

// Initialize wallet logic
async function initializeWallet(): Promise<WalletSelector | undefined> {
  try {
    const selector = await setupWalletSelector({
      network: 'mainnet',  // Specify the network
      modules: [/* your wallet modules */],  // Add your wallet modules
    });

    if (!selector) {
      return undefined;
    }
    return selector;
  } catch (error) {
    console.error('Error initializing wallet:', error);
    return undefined;
  }
}

export function useWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { setTransactionOrigin, getTransactionOrigin } = useTransaction();  // Using Transaction Context

  const { selector, wallet, accountId } = useSelector((state: RootState) => state);

  useEffect(() => {
    const initialize = async () => {
      const sel = await initializeWallet();

      if (!sel) return;

      dispatch(setSelector(sel));

      if (sel && sel.isSignedIn()) {
        const w = await sel.wallet();
        dispatch(setWallet(w));
        const accounts = await w.getAccounts();
        dispatch(setAccountId(accounts[0]?.accountId || null));
        router.replace('/home');
      }
    };

    initialize();
  }, [dispatch, selector, wallet, accountId, router]);

  const connectWallet = async () => {
    if (isConnecting || !selector) return;

    setIsConnecting(true);

    try {
      const walletInstance = await selector.wallet('bitte-wallet');
      await walletInstance.signIn({
        contractId: 'social.near',
        methodNames: [],
        accounts: [],
      });

      dispatch(setWallet(walletInstance));
      const accounts = await walletInstance.getAccounts();
      dispatch(setAccountId(accounts[0]?.accountId || null));
      router.replace('/home');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (wallet && selector) {
      await wallet.signOut();
      dispatch(setWallet(null));
      dispatch(setAccountId(null));
      router.replace('/');
    }
  };

  const handleTransactionDecline = () => {
    console.log('Transaction declined, going back...');
    const { originRoute } = getTransactionOrigin();  // Get the route where the transaction was initiated from
    if (originRoute) {
      router.replace(originRoute); // Navigate back to the origin route
    } else {
      router.replace('/');  // Default fallback if originRoute is null
    }
  };

  return {
    wallet,
    accountId,
    isConnecting,
    connectWallet,
    disconnectWallet,
    handleTransactionDecline,  // Added to return
  };
}
