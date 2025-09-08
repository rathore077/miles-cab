
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/auth", // points to https://miles-cab.onrender.com/api/auth
});

// Login
export const login = async (username, password) => {
  const res = await API.post("/login", { username, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("userName", res.data.username);
  return res.data;
};

// Register
export const register = async (username, password) => {
  const res = await API.post("/register", { username, password });
  return res.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};
