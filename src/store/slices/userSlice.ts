import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  wallet: string | null;
  userProfile: any;
}

const initialState: UserState = {
  wallet: null,
  userProfile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setWallet, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
