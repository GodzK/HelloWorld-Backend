import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { getUserProfile } from "../models/userModel.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/Profile" , getUserProfile)
export default router;