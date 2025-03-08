// src/store/slices/walletSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  wallet: any | null;
  accountId: string | null;
  isConnecting: boolean;
  isDisconnecting: boolean;
  selector: any | null;
  connectionStatus: 'idle' | 'connecting' | 'connected' | 'disconnected';
  transactionStatus: 'idle' | 'pending' | 'success' | 'failed' | 'cancelled'; // Added
  transactionError: string | null; // Added
}

const initialState: WalletState = {
  wallet: null,
  accountId: null,
  isConnecting: false,
  isDisconnecting: false,
  selector: null,
  connectionStatus: 'idle',
  transactionStatus: 'idle',
  transactionError: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<any>) => {
      state.wallet = action.payload;
    },
    setAccountId: (state, action: PayloadAction<string | null>) => {
      state.accountId = action.payload;
    },
    setIsConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setIsDisconnecting: (state, action: PayloadAction<boolean>) => {
      state.isDisconnecting = action.payload;
    },
    setSelector: (state, action: PayloadAction<any>) => {
      state.selector = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<WalletState['connectionStatus']>) => {
      state.connectionStatus = action.payload;
    },
    setTransactionStatus: (state, action: PayloadAction<WalletState['transactionStatus']>) => {
      state.transactionStatus = action.payload;
    },
    setTransactionError: (state, action: PayloadAction<string | null>) => {
      state.transactionError = action.payload;
    },
  },
});

export const {
  setWallet,
  setAccountId,
  setIsConnecting,
  setIsDisconnecting,
  setSelector,
  setConnectionStatus,
  setTransactionStatus,
  setTransactionError,
} = walletSlice.actions;

export default walletSlice.reducer;