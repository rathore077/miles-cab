// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, 
// });

// export const getRides = async () => {
//   const res = await axios.get(API_URL);
//   return res.data;
// };

// export const getRideById = async (id) => {
//   const res = await axios.get(`${API_URL}/${id}`);
//   return res.data;
// };
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
});

// Fetch all rides
export const getRides = async () => {
  const res = await API.get("/rides"); 
  return res.data;
};

// Fetch ride by ID
export const getRideById = async (id) => {
  const res = await API.get(`/rides/${id}`);
  return res.data;
};
