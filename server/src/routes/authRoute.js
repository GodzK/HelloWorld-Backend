import express from "express";
import { authUser } from "../controller/authController.js";
const userAuth = express.Router();

userAuth.post("/login", authUser); 

export default userAuth;
