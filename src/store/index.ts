import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Add more slices here as needed
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
