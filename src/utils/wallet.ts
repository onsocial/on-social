import {
  setupWalletSelector,
  WalletSelector,
  WalletModuleFactory,
  Wallet,
} from '@near-wallet-selector/core';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';

export async function initializeWalletSelector(): Promise<WalletSelector> {
  const selector = await setupWalletSelector({
    network: 'mainnet', // Using mainnet for social.near
    modules: [
      setupBitteWallet({
        walletUrl: 'https://wallet.bitte.ai',
        callbackUrl: 'onsocial://wallet-callback', // Deep link for React Native
        deprecated: false,
      }) as WalletModuleFactory<Wallet>, // Type assertion to align with Wallet
    ],
  });

  return selector;
}
