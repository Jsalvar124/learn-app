import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTraineeByUsername, updateTrainee } from "../../services/traineeService";
import { getTrainerByUsername, updateTrainer } from "../../services/trainerService";
import type { Role } from "../slices/userSlice";
import type { Trainee, Trainer } from "../../types/user";
import type { UpdateTraineePayload, UpdateTrainerPayload } from "../../types/user";

export const getUserProfileThunk = createAsyncThunk<Trainer | Trainee, { username: string; role: Role }>
    ("user/getUserProfile", 
        async ({ username, role }) => {
        if (role === "TRAINER") {
            return await getTrainerByUsername(username);
        }
        return await getTraineeByUsername(username);
    }
    );

export const updateUserThunk = createAsyncThunk<Trainer | Trainee, { username: string; role: Role; data: UpdateTrainerPayload | UpdateTraineePayload }>
    ("user/updateUser",
        async ({ username, role, data }) => {
        if (role === "TRAINER") {
            return await updateTrainer(username, data as UpdateTrainerPayload);
        }
        return await updateTrainee(username, data as UpdateTraineePayload);
  }
);