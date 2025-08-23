import { Router } from "express";
import { createBooking, getMyBookings, cancelBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/", protect,createBooking);
router.get("/",protect, getMyBookings);
router.delete("/:id",protect, cancelBooking);

export default router;
