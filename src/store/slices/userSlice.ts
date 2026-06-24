import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Role = "TRAINER" | "TRAINEE";

type UserState = {
  username: string | null;
  role: Role | null;
  token: string | null;
  isAuth: boolean;
};

const initialState: UserState = {
  username: null,
  role: null,
  token: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ username: string; role: Role; token: string }>) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isAuth = true; // reducer is only called when response is successful, so value must be true.
    },
    removeUserData: (state) => { // no action needed, just erases data from state. 
      state.username = null;
      state.role = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;