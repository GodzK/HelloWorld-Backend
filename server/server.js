import express from "express";
import cors from "cors";
import jwt from "jwt-simple"
import connection from "./src/config/database.js";
import userRoute from "./src/routes/userRoute.js";
import userAuth from "./src/routes/authRoute.js";
import bookingRoute from "./src/routes/bookingRoute.js";
import roomRoute from "./src/routes/roomRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


connection.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});


app.use('/api/auth' , userAuth)
app.use("/api/user", userRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/rooms", roomRoute);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({
    header: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
