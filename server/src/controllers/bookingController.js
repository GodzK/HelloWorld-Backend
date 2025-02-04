import { createBooking, getBookings } from "../models/bookingModel.js";

export const bookRoom = async (req, res) => {
    try {
        const { room_id, start_time, end_time, duration, status, description } = req.body;
        const user_id = req.user.id;
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
