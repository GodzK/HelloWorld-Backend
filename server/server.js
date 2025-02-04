import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./src/config/database.js";
import userRoute from "./src/routes/userRoute.js";
import roomRoute from "./src/routes/roomRoute.js";
import session from "express-session";
import bookingRoute from "./src/routes/bookingRoute.js";
import logRoute from "./src/routes/logRoute.js";
import staffRoute from "./src/routes/staffRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false, 
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true, 
        sameSite: 'strict', 
        maxAge: 24 * 60 * 60 * 1000 
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

console.log(db.query("SELECT 1"));

app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/logs", logRoute);
app.use("/api/staff", staffRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server run on port ${port}`));