import express from "express";
import { fetchRooms, fetchRoomById, addRoom } from "../controllers/roomController.js";
import { verifyToken, checkRole } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, fetchRooms);
router.get("/:id", verifyToken, fetchRoomById);
router.post("/", verifyToken, checkRole("admin"), addRoom);
router.get("/area/:area", verifyToken, async (req, res) => {
    const { area } = req.params;
    const rooms = await fetchRoomsByArea(area);
    res.json(rooms);
});
export default router;
