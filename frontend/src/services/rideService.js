
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
});

// Fetch all rides
export const getRides = async () => {
  const res = await API.get("/api/rides"); 
  return res.data;
};

// Fetch ride by ID
export const getRideById = async (id) => {
  const res = await API.get(`/api/rides/${id}`);
  return res.data;
};
