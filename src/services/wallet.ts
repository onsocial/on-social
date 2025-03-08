// src/services/wallet.ts
import { WalletSelector, Wallet, Action } from '@near-wallet-selector/core';
import { initializeWalletSelector } from '@utils/wallet';
import { Platform } from 'react-native';
import { store } from '@store/index';

export class WalletService {
  private selector: WalletSelector | null = null;
  private wallet: Wallet | null = null;

  async initialize() {
    if (!this.selector) {
      this.selector = await initializeWalletSelector();
      if (this.selector.isSignedIn()) {
        this.wallet = await this.selector.wallet('bitte-wallet');
        const accounts = await this.wallet.getAccounts();
        store.dispatch({ type: 'wallet/setAccountId', payload: accounts[0]?.accountId || null });
        store.dispatch({ type: 'wallet/setWallet', payload: this.wallet });
        store.dispatch({ type: 'wallet/setConnectionStatus', payload: 'connected' });
      }
    }
    return this.selector;
  }

  async connect(from: string): Promise<string | null> {
    const selector = await this.initialize();
    if (this.wallet && (await this.wallet.getAccounts()).length > 0) {
      return store.getState().accountId; // Already connected
    }
    const walletInstance = await selector.wallet('bitte-wallet');
    const callbackUrl = this.getCallbackUrl(from);
    await walletInstance.signIn({ 
      contractId: 'social.near', 
      methodNames: [],
      accounts: [],
    });
    this.wallet = walletInstance;
    const accounts = await walletInstance.getAccounts();
    const accountId = accounts[0]?.accountId || null;
    store.dispatch({ type: 'wallet/setAccountId', payload: accountId });
    store.dispatch({ type: 'wallet/setWallet', payload: walletInstance });
    store.dispatch({ type: 'wallet/setConnectionStatus', payload: 'connected' });
    return accountId;
  }

  async sendTransaction(
    receiverId: string,
    actions: Array<Action>,
    from: string
  ): Promise<string> {
    const selector = await this.initialize();
    if (!this.wallet) throw new Error('Wallet not connected');
    const callbackUrl = this.getCallbackUrl(from);

    store.dispatch({ type: 'wallet/setTransactionStatus', payload: 'pending' });

    // Wrap transaction in a timeout to handle decline without redirect
    const transactionPromise = this.wallet.signAndSendTransaction({
      receiverId,
      actions,
      callbackUrl,
    });

    const timeoutPromise = new Promise<string>((_, reject) =>
      setTimeout(() => {
        console.log('Transaction timed out - assuming decline');
        reject(new Error('Transaction cancelled or timed out'));
      }, 15000) // 15-second timeout
    );

    try {
      const txHash = await Promise.race([transactionPromise, timeoutPromise]);
      return txHash as unknown as string;
    } catch (error: any) {
      console.log('Transaction failed in WalletService:', error.message);
      store.dispatch({ type: 'wallet/setTransactionStatus', payload: 'cancelled' });
      store.dispatch({ type: 'wallet/setTransactionError', payload: error.message || 'Transaction cancelled' });
      throw error; // Re-throw to let caller handle navigation
    }
  }

  async disconnect() {
    if (!this.wallet) return;
    await this.wallet.signOut();
    this.wallet = null;
    store.dispatch({ type: 'wallet/setAccountId', payload: null });
    store.dispatch({ type: 'wallet/setWallet', payload: null });
    store.dispatch({ type: 'wallet/setConnectionStatus', payload: 'disconnected' });
  }

  isConnected(): boolean {
    return !!store.getState().accountId;
  }

  private getCallbackUrl(from: string): string {
    return Platform.OS === 'web'
      ? `${window.location.origin}/wallet-callback?from=${from}`
      : `onsocial://wallet-callback?from=${from}`;
  }
}

export const walletService = new WalletService();