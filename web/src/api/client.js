import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || "http://127.0.0.1:8000/api/auth";

export const api = axios.create({ baseURL: API_BASE_URL });
export const authApi = axios.create({ baseURL: AUTH_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
