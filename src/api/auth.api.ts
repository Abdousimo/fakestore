import { apiClient } from "@/lib/api-client";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "@/validation";
import { AxiosError } from "axios";
import { z } from "zod";

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AuthError";
  }
}

export interface AuthResponse {
  token: string;
}

export const login = async (
  credentials: z.infer<typeof loginValidationSchema>
): Promise<AuthResponse | undefined> => {
  try {
    const { data } = await apiClient.post("/auth/login", credentials);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        throw new AuthError(
          error.response?.data?.message || "Invalid credentials",
          error.response?.data?.code
        );
      }
      if (error.response?.status === 401) {
        throw new AuthError(
          error.response?.data?.message || "Ismail",
          error.response?.data?.code
        );
      }
      throw new AuthError(
        error.response?.data?.message || "Login failed please try again",
        error.response?.data?.code
      );
    }
  }
};

export const signup = async ({
  ...credentials
}: z.infer<typeof signupValidationSchema>): Promise<
  AuthResponse | undefined
> => {
  try {
    const { data } = await apiClient.post("/users", credentials);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new AuthError(
        error.response?.data?.message || "Signup failed please try again",
        error.response?.data?.code
      );
    }
  }
};






