import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';
import { Near, connect, keyStores } from 'near-api-js';
import { WalletModuleFactory, Wallet } from '@near-wallet-selector/core';

export async function initializeWalletSelector() {
  console.log('Initializing Wallet Selector for mainnet with Bitte Wallet');
  const bitteWallet = setupBitteWallet({
    walletUrl: 'https://wallet.bitte.ai',
    callbackUrl: 'onsocial://wallet-callback',
    contractId: 'social.near',
  }) as WalletModuleFactory<Wallet>; // Cast to broader Wallet type

  const selector = await setupWalletSelector({
    network: 'mainnet',
    modules: [bitteWallet],
  });

  console.log('Wallet Selector initialized:', selector);
  return selector;
}

export async function initializeNearConnection() {
  const config = {
    networkId: 'mainnet',
    keyStore: new keyStores.InMemoryKeyStore(),
    nodeUrl: 'https://rpc.mainnet.fastnear.com',
    walletUrl: 'https://wallet.bitte.ai',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
  };
  const near = await connect(config);
  return near;
}