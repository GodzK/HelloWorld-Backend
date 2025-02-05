import express from "express";
import { bookRoom, cancelUserBooking, fetchBookings } from "../controllers/bookingController.js";
import {checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/",  checkRole("student", "professor"), bookRoom);
router.delete("/:booking_id",  cancelUserBooking);

export default router;
