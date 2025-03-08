import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import walletReducer from '@store/slices/walletSlice';

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, walletReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
