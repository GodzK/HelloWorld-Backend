import express from "express";
import { fetchRooms, fetchRoomById, addRoom } from "../controller/roomController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", authenticateJWT, fetchRooms);
router.get("/:id", authenticateJWT, fetchRoomById);
router.post("/", authenticateJWT, authorizeRoles("admin"), addRoom);

export default router;

// server/src/models/bookingModel.js
import db from "../config/database.js";

export const createBooking = async (userId, roomId, date, startTime, endTime) => {
    const [rows] = await db.query(
        `INSERT INTO bookings (user_id, room_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
        [userId, roomId, date, startTime, endTime]
    );
    return rows;
};

export const getBookings = async () => {
    const [rows] = await db.query(`SELECT * FROM bookings`);
    return rows;
};
