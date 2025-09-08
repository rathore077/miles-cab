import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/bookings", bookingRoutes);

// Serve frontend (after build, React will be in ../frontend/dist)
// const frontendPath = path.join(__dirname, "../frontend/dist");
// app.use(express.static(frontendPath));

// // React Router fallback (must be last, after API routes)
// app.get("/*wildcard", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// Error Handler (last middleware)
app.use(errorHandler);

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
