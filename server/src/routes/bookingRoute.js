import express from "express";
import { bookRoom, fetchBookings } from "../controllers/bookingController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", authenticateJWT, authorizeRoles("student", "professor"), bookRoom);
router.get("/", authenticateJWT, fetchBookings);

export default router;
