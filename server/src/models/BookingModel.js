import db from "../config/database.js";

export const createBooking = async (userId, roomId, date, startTime, endTime) => {
    const [rows] = await db.query(
        `INSERT INTO bookings (user_id, room_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
        [userId, roomId, date, startTime, endTime]
    );
    return rows;
};

export const getBookings = async () => {
    const [rows] = await db.query(`SELECT * FROM bookings`);
    return rows;
};