
import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";

// Create a booking
export const createBooking = async (req, res) => {
  try {
    const { rideId, seats, date } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    
    if (ride.seatsAvailable < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }
    const booking = await Booking.create({
      user: req.user._id,               // assuming auth middleware adds req.user
      ride: rideId,
      seats,
      date,
      price: ride.price * seats,       // ✅ calculate price
    });
    
     ride.seatsAvailable -= seats;
    await ride.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings for logged-in user
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("ride");
    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("ride");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    
     booking.ride.seatsAvailable += booking.seats;
    await booking.ride.save();

    await booking.deleteOne();
    res.json({ message: "Booking canceled" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
