import express from "express";
import cors from "cors";
import connection from "./src/config/database.js"; 
import userRoute from "./src/routes/userRoute.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

connection.connect((err) => {
    if (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    } else {
        console.log("Connected to database");
    }
});

app.use('/api/user', userRoute);

app.get("/", (req, res) => {
    res.json({
        header: "Hello World",
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
