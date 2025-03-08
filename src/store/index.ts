import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage or AsyncStorage for persistence
import walletReducer from '@store/slices/walletSlice'; // Import your wallet slice

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage, // Choose storage, here we're using localStorage for web
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, walletReducer);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer for wallet state
});

// Create Persistor for Redux Persist
export const persistor = persistStore(store);

// Define RootState type to refer to the entire state of the store
export type RootState = ReturnType<typeof store.getState>;  // Automatically infer state structure
export type AppDispatch = typeof store.dispatch;
