import type { ApiError } from "../types";
import { BASE_URL } from ".";
// Registration 
// services/userService.ts

export type CreateTrainerPayload = {
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
};

export type CreateTraineePayload = {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // "YYYY-MM-DD", must be in the past
  email: string;
  address: string;
};

export type CreateUserResponse = {
  username: string;
  password: string;
};

export const createTrainer = async (data: CreateTrainerPayload): Promise<CreateUserResponse> => {
  const response = await fetch(`${BASE_URL}/trainers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }

  return await response.json();
};

export const createTrainee = async (data: CreateTraineePayload): Promise<CreateUserResponse> => {
  const response = await fetch(`${BASE_URL}/trainees`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }

  return await response.json();
};

// Login

type LoginPayload = {
  username: string;
  password: string;
}

export type LoginResponse = {
  token: string;
};

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorBody: ApiError = await response.json();
    throw new Error(errorBody.message);
  }

  return await response.json();
}