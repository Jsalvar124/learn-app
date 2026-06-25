// services/trainerService.ts
import type { Trainee } from "../types/user";
import type { ApiError } from "../types";
import { BASE_URL } from ".";
import type { UpdateTraineePayload } from "../types/user";

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

export const updateTrainee = async (username: string, data: UpdateTraineePayload): Promise<Trainee> => {
  const response = await fetch(`${BASE_URL}/trainees/${username}`, {
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

export const deleteTrainee = async (username: string ): Promise<void> => {
  const response = await fetch(`${BASE_URL}/trainees/${username}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }
}