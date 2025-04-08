import axios, { AxiosError } from "axios";
import { deleteAccessTokenCookie, getAccessTokenFromCookie } from "./utils";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? getAccessTokenFromCookie() : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      deleteAccessTokenCookie();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { apiClient };
