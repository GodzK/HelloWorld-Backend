import express from "express";
import { fetchStaff } from "../controllers/staffController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", authenticateJWT, authorizeRoles("admin"), fetchStaff);

export default router;
