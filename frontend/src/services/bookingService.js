import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/bookings", // ✅ uses your .env
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

// Create booking
export const createBooking = async (data) => {
  const res = await API.post("/bookings", data, getAuthConfig());
  return res.data;
};

// Get all bookings for logged-in user
export const getBookings = async () => {
  const res = await API.get("/bookings", getAuthConfig());
  return res.data;
};

// Cancel a booking
export const cancelBooking = async (id) => {
  const res = await API.delete(`/bookings/${id}`, getAuthConfig());
  return res.data;
};
