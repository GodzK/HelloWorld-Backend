import express from "express";
import { bookRoom, cancelUserBooking, fetchBookings } from "../controllers/bookingController.js";
import {checkRole } from "../middlewares/authMiddleware.js";
import { getBookings } from "../models/bookingModel.js";

const router = express.Router();
router.get("/" , fetchBookings)
router.post("/",  checkRole("student", "professor"), bookRoom);
router.delete("/:booking_id",  cancelUserBooking);

export default router;
