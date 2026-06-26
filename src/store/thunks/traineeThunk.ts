import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TraineeSummary } from "../../types/user";
import { getTrainees } from "../../services/traineeService";

export const getAllTraineesThunk = createAsyncThunk<TraineeSummary[]>
("trainees/getAllTrainees", 
    async ()=> {
        return await getTrainees(); 
    }
);