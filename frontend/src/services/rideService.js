import axios from "axios";

const API_URL = "http://localhost:5000/api/rides";

export const getRides = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getRideById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
