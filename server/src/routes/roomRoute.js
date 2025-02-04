import express from "express";
import { fetchRooms, fetchRoomById, addRoom } from "../controllers/roomController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, fetchRooms);
router.get("/:id", verifyToken, fetchRoomById);
router.post("/", verifyToken, checkRole("admin"), addRoom);

export default router;
