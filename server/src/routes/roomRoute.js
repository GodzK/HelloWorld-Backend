import express from "express";
import { fetchRooms, fetchRoomById, addRoom } from "../controllers/roomController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", authenticateJWT, fetchRooms);
router.get("/:id", authenticateJWT, fetchRoomById);
router.post("/", authenticateJWT, authorizeRoles("admin"), addRoom);

export default router;
