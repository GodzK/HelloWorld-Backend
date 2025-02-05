import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { getUserProfile } from "../models/userModel.js";

const router = express.Router();

router.get("/Profile" , getUserProfile)
export default router;