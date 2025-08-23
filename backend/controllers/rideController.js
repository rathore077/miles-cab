import Ride from "../models/Ride.js";

export const getRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createRide = async (req, res) => {
  try {
    const { driverName, origin, destination, seatsAvailable } = req.body;
    const ride = await Ride.create({ driverName, origin, destination, seatsAvailable });
    res.status(201).json(ride);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
