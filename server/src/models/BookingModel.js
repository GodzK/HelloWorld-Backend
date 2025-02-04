import db from "../config/database.js";

export const createBooking = async (user_id, room_id, start_time, end_time, duration, status, description) => {
    const [result] = await db.query(
        `INSERT INTO Booking (user_id, room_id, start_time, end_time, duration, status, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, room_id, start_time, end_time, duration, status, description]
    );
    return result;
};

export const getBookings = async () => {
    const [rows] = await db.query(`SELECT * FROM Booking`);
    return rows;
};
