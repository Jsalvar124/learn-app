// services/trainerService.ts
import type { Trainer } from "../types/user";
import type { ApiError } from "../types";
import { BASE_URL } from ".";
import type { UpdateTrainerPayload } from "../types/user";

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

export const updateTrainer = async (username: string, data: UpdateTrainerPayload): Promise<Trainer> => {
  const response = await fetch(`${BASE_URL}/trainers/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }

  return await response.json();
}

export const deactivateTrainer = async (username: string ): Promise<void> => {
  const response = await fetch(`${BASE_URL}/trainers/${username}/state`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ isActive: false }),
  });
  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }
}