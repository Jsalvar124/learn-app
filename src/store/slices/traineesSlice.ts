import { createSlice } from "@reduxjs/toolkit";
import type { TraineeSummary } from "../../types/user";
import { getAllTraineesThunk } from "../thunks/traineeThunk";

type TraineesState = {
  items: TraineeSummary[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
};

const initialState: TraineesState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};
// 3 things for the create slice
const traineeSlice = createSlice({
    name: "trainees",
    initialState,
    reducers: {}, // empty reducers, using Extra Reducer for thunk
    extraReducers: (builder) => {
      builder
        .addCase(getAllTraineesThunk.pending, (state)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(getAllTraineesThunk.fulfilled, (state, action)=> {
          state.loading=false;
          state.items=action.payload;
          state.lastFetched=Date.now();
        })
        .addCase(getAllTraineesThunk.rejected, (state, action)=> {
          state.loading=false;
          state.error=action.error.message ?? "Failed to load Trainees";
        })
    }
})

export default traineeSlice.reducer;
