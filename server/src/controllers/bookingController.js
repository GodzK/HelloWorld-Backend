import { createBooking, getBookings ,checkRoomAvailability , cancelBooking} from "../models/bookingModel.js";

export const bookRoom = async (req, res) => {
    try {
        const { room_id, start_time, end_time, duration, status, description } = req.body;
        const user_id = req.user.id;

        // ตรวจสอบว่าห้องว่างหรือไม่
        const isAvailable = await checkRoomAvailability(room_id, start_time, end_time);
        if (!isAvailable) {
            return res.status(400).json({ message: "Room is already booked for this time slot" });
        }
        // ถ้าว่างให้ทำการจอง
        const booking = await createBooking(user_id, room_id, start_time, end_time, duration, status, description);
        res.status(201).json({ message: "Booking Successful", booking });
    } catch (err) {
        res.status(500).json({ message: "Booking Failed", error: err.message });
    }
};

export const fetchBookings = async (req, res) => {
    try {
        const bookings = await getBookings();
        res.status(200).json({ bookings });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
    }
};
export const cancelUserBooking = async (req, res) => {
    try {
        const { booking_id } = req.body;
        const user_id = req.user.id;

        const success = await cancelBooking(booking_id, user_id);
        if (!success) {
            return res.status(400).json({ message: "Booking not found or unauthorized" });
        }

        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Cancellation failed", error: err.message });
    }
};