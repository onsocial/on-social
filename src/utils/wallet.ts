import {
  setupWalletSelector,
  WalletSelector,
  WalletModuleFactory,
  Wallet,
} from '@near-wallet-selector/core';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';

export async function initializeWalletSelector(): Promise<WalletSelector> {
  console.log('Initializing Wallet Selector for mainnet with Bitte Wallet');
  const bitteWallet = setupBitteWallet({
    walletUrl: 'https://wallet.bitte.ai', // Mainnet URL
    callbackUrl: 'onsocial://wallet-callback', // Deep link for React Native
    contractId: 'social.near', // Set contractId here per instructions
    deprecated: false,
  }) as WalletModuleFactory<Wallet>;

  const selector = await setupWalletSelector({
    network: 'mainnet', // Match networkId
    modules: [bitteWallet],
  });

  console.log('Wallet Selector initialized:', selector);
  return selector;
}