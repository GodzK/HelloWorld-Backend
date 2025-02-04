import express from "express";
import { bookRoom, cancelUserBooking, fetchBookings } from "../controllers/bookingController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", verifyToken, checkRole("student", "professor"), bookRoom);
router.delete("/:booking_id", verifyToken, cancelUserBooking);
router.delete("/delete", verifyToken, cancelUserBooking);

export default router;
