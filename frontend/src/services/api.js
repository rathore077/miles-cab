import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL , // comes from your .env
});

// Add token automatically if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
