import { Router } from "express";
import { getRides, createRide } from "../controllers/rideController.js";

const router = Router();

router.get("/", getRides);
router.post("/", createRide);

export default router;
