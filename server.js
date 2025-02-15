import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./src/config/database.js";
import userRoute from "./src/routes/userRoute.js";
import roomRoute from "./src/routes/roomRoute.js";
import session from "express-session";
import Authrouth from "./src/routes/authRoute.js"
import { verifyToken } from "./src/middlewares/authMiddleware.js";
import bookingRoute from "./src/routes/bookingRoute.js";
import staffRoute from "./src/routes/staffRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(cookieParser());

console.log(db.query("SELECT 1"));
app.use("/api/auth" ,Authrouth);
app.use("/api/users", verifyToken, userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/bookings",verifyToken , bookingRoute);
app.use("/api/staff", staffRoute);
app.use(errorHandler);
app.listen(port, () => console.log(`Server run on port ${port}`));












