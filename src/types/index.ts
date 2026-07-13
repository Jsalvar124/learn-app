export type Role = 'student' | 'trainer';

export type TrainerTraining = {
  trainingName: string;
  trainingDate: string;
  trainingType: string;
  duration: number;
  traineeName: string;
};

export type TraineeTraining = {
  trainingName: string;
  trainingDate: string;
  trainingType: string;
  duration: number;
  trainerName: string;
};

export type Training = TrainerTraining | TraineeTraining;

export type ApiError = {
  error: string;
  message: string;
  timestamp: string;
  status: number;
};