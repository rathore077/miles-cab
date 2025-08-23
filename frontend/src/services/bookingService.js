
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // ✅ points to https://miles-cab.onrender.com
});

// Helper to get token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem("token"); // saved at login
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createBooking = async (data) => {
  const res = await axios.post(API_URL, data, getAuthConfig());
  return res.data;
};

export const getBookings = async () => {
  const res = await axios.get(API_URL, getAuthConfig());
  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return res.data;
};
