export type Role = 'student' | 'trainer';

export type Training = {
  date: string;
  name: string;
  type: string;
  trainerName: string;
  duration: string;
}

export type ApiError = {
  error: string;
  message: string;
  timestamp: string;
  status: number;
};