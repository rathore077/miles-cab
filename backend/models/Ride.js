import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  price: {type:Number, required:true},
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  image: { type: String, default: "car-placeholder.jpg" },
});

export default mongoose.model("Ride", rideSchema);
