import express from "express";
import { logAction, fetchLogs } from "../controllers/logController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", authenticateJWT, logAction);
router.get("/", authenticateJWT, fetchLogs);

export default router;
