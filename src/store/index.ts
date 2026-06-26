// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import traineesSlice from "./slices/traineesSlice"

const store = configureStore({
  reducer: {
    user: userSlice,
    trainees: traineesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;