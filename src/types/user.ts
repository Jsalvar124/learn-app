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