// types/user.ts

export type TraineeSummary = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type TrainerSummary = {
  username: string;
  firstName: string;
  lastName: string;
  specialization: string; 
  email: string;
};

export type Trainer = {
  username: string;
  firstName: string;
  lastName: string;
  specialization: string;
  active: boolean;
  email: string;
  trainees: TraineeSummary[];
};

export type Trainee = {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  active: boolean;
  email: string;
  trainers: TrainerSummary[];
};

export type UpdateTrainerPayload = {
  username: string;
  firstName: string;
  lastName: string;
  specialization: string;
  isActive: boolean; // note: "isActive" here, NOT "active" — backend inconsistency, confirmed from the curl
  email: string;
};

export type UpdateTraineePayload = {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  isActive: boolean;
  email: string;
};