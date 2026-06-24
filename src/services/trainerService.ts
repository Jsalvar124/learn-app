// services/trainerService.ts
import type { Trainer } from "../types/user";
import type { ApiError } from "../types";
import { BASE_URL } from ".";

export const getTrainerByUsername = async (username: string): Promise<Trainer> => {
  const response = await fetch(`${BASE_URL}/trainers/${username}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }
  return await response.json();
};