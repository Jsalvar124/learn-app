// services/trainerService.ts
import type { Trainee } from "../types/user";
import type { ApiError } from "../types";
import { BASE_URL } from ".";

export const getTraineeByUsername = async (username: string): Promise<Trainee> => {
  const response = await fetch(`${BASE_URL}/trainees/${username}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }
  return await response.json();
};