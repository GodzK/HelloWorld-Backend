import { createBooking, getBookings } from "../models/bookingModel.js";

export const bookRoom = async (req, res) => {
    try {
        const { roomId, date, startTime, endTime } = req.body;
        const userId = req.user.id;
        const booking = await createBooking(userId, roomId, date, startTime, endTime);
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