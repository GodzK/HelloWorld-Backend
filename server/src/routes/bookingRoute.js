import express from "express";
import { bookRoom, fetchBookings } from "../controller/bookingController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const bookingRoute = express.Router();
bookingRoute.post("/", authenticateJWT, authorizeRoles("student", "professor"), bookRoom);
bookingRoute.get("/", authenticateJWT, fetchBookings);

export default bookingRoute;
