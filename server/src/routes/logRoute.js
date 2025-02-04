import express from "express";
import { logAction, fetchLogs } from "../controllers/logController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", verifyToken, logAction);
router.get("/", verifyToken, fetchLogs);

export default router;
