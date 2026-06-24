import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTraineeByUsername } from "../../services/traineeService";
import { getTrainerByUsername } from "../../services/trainerService";
import type { Role } from "../slices/userSlice";
import type { Trainee, Trainer } from "../../types/user";

export const getUserProfileThunk = createAsyncThunk<Trainer | Trainee,{ username: string; role: Role }>
    ("user/getUserProfile", 
        async ({ username, role }) => {
        if (role === "TRAINER") {
            return await getTrainerByUsername(username);
        }
        return await getTraineeByUsername(username);
    }
    );