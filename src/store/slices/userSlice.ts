import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Trainer, Trainee } from "../../types/user";
import { getUserProfileThunk, updateUserThunk } from "../thunks/userThunk";
export type Role = "TRAINER" | "TRAINEE";

type UserState = {
  username: string | null;
  role: Role | null;
  token: string | null;
  isAuth: boolean;
  profile: Trainer | Trainee | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  username: null,
  role: null,
  token: null,
  isAuth: false,
  profile: null,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load profile";
      })
          // --- new cases for updateUserThunk ---
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // overwrite with the updated profile from the response
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update profile";
      });
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;