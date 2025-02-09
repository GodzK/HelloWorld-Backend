import express from "express";
import { bookRoom, cancelUserBooking, fetchBookings } from "../controllers/bookingController.js";
import { checkRole, verifyToken } from "../middlewares/authMiddleware.js";
import db from "../config/database.js";

const router = express.Router();

router.get("/", verifyToken, fetchBookings);
router.post("/", checkRole("student", "professor"), bookRoom);
router.delete("/:booking_id", cancelUserBooking);

router.put("/:bookingId", async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    
    try {
        const query = "UPDATE Booking SET status = ?, last_updated = NOW() WHERE booking_id = ?";
        const [result] = await db.execute(query, [status, bookingId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        res.json({ message: "Booking status updated successfully" });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
