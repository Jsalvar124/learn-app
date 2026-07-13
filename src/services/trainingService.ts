import { BASE_URL } from ".";
import type { Training, ApiError } from "../types";

export type GetTrainerTrainingsParams = {
  fromDate?: string;
  toDate?: string;
  traineeUsername?: string;
};


export type GetTraineeTrainingsParams = {
  fromDate?: string;
  toDate?: string;
  trainerUsername?: string;
};

export type CreateTrainingPayload = {
  traineeUsername: string,
  trainerUsername: string,
  trainingName: string,
  trainingDate: string,
  trainingDuration: number
};

export const getTrainerTrainings = async (username: string, params: GetTrainerTrainingsParams = {}): Promise<Training[]> => {
  const query = new URLSearchParams();
  if (params.fromDate) query.set("fromDate", params.fromDate);
  if (params.toDate) query.set("toDate", params.toDate);
  if (params.traineeUsername) query.set("traineeUsername", params.traineeUsername);

  const queryString = query.toString();
  const url = `${BASE_URL}/trainers/${username}/trainings${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }

  return await response.json();
};

export const getTraineeTrainings = async (username: string, params: GetTraineeTrainingsParams = {}): Promise<Training[]> => {
  const query = new URLSearchParams();
  if (params.fromDate) query.set("fromDate", params.fromDate);
  if (params.toDate) query.set("toDate", params.toDate);
  if (params.trainerUsername) query.set("trainerUsername", params.trainerUsername);

  const queryString = query.toString();
  const url = `${BASE_URL}/trainees/${username}/trainings${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }

  return await response.json();
};

export const createTraining = async( data: CreateTrainingPayload ): Promise<void> =>{
  const response = await fetch(`${BASE_URL}/trainings`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data)
  });
  if(!response.ok){
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }
}