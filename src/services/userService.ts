const BASE_URL = "http://localhost:4000";


// Registration 

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

type CreateUserResponse = {
  successful: boolean;
  result: string;
};

export const createUser = async (data: CreateUserPayload): Promise<CreateUserResponse> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

// Login

type LoginPayload = {
  email: string;
  password: string;
}

export type LoginUser = {
  name: string;
  email: string;
  password: string; // odd that login echoes password back, but that's what the schema says
};

export type LoginResponse = {
  successful: boolean;
  result: string; // the "Bearer ..." token string
  user: LoginUser;
};

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
}