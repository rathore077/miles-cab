import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
  seats: { type: Number, required: true },
  date: { type: Date, default:Date.now },
  price: { type: Number, required: true },
});

export default mongoose.model("Booking", bookingSchema);
