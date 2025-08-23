// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Ride from "./models/Ride.js";

dotenv.config();

const rides = [
  {
    
    origin: "Delhi",
    destination: "Jaipur",
    seatsAvailable: 4,
    price: 1500,
    image:"camry-cab.jpg",
  },
  {
    
    origin: "Mumbai",
    destination: "Pune",
    seatsAvailable: 3,
    price: 1800,
    image:"ertiga-cab.jpg",
  },
  {
    
    origin: "Bangalore",
    destination: "Mysore",
    seatsAvailable: 5,
    price: 1100,
    image:"swift-cab.jpg",
  },
  {
    origin: "Hyderabad",
    destination: "Vijayawada",
    seatsAvailable: 6,
    price: 1000,
    image: "EV.jpg",
  },
  {
    origin: "Chennai",
    destination: "Pondicherry",
    seatsAvailable: 5,
    price: 750,
    image: "Honda.jpg",
  },
  {
    origin: "Jaipur",
    destination: "Udaipur",
    seatsAvailable: 4,
    price: 1100,
    image: "hyundai.jpg",
  },
  {
    origin: "Ahmedabad",
    destination: "Surat",
    seatsAvailable: 5,
    price: 950,
    image: "oldsafari.jpg",
  },
  {
    origin: "Kolkata",
    destination: "Digha",
    seatsAvailable: 3,
    price: 850,
    image: "safari.jpg",
  },
  {
    origin: "Lucknow",
    destination: "Kanpur",
    seatsAvailable: 6,
    price: 600,
    image: "scorpioN.jpg",
  },
  {
    origin: "Goa",
    destination: "Mumbai",
    seatsAvailable: 4,
    price: 1500,
    image: "XUV300.jpg",
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Ride.deleteMany();
    console.log("🗑️ Old rides removed");

    await Ride.insertMany(rides);
    console.log("🚖 Sample rides added");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
