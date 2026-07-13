// helpers/decodeToken.ts
import type { Role } from "../store/slices/userSlice"; // reuse the Role type

export type DecodedToken = {
  sub: string;       // username
  userType: Role; // TRAINER | TRAINEE
  iat: number;
  exp: number;
};

export const decodeToken = (token: string): DecodedToken => {
  const payloadBase64 = token.split(".")[1];
  const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = atob(base64);
  return JSON.parse(decoded);
};