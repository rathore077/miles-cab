import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("userName", res.data.username);
  return res.data;
};

export const register = async (username, password) => {
  const res = await axios.post(`${API_URL}/register`, { username, password });
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
};
