import express from "express";
import { getUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/:id", getUser); 

export default userRoute;
 