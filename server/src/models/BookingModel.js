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
export const checkRoomAvailability = async (room_id, start_time, end_time) => {
    const [rows] = await db.query(
        `SELECT * FROM Booking 
        WHERE room_id = ? 
        AND ((start_time < ? AND end_time > ?) 
        OR (start_time >= ? AND start_time < ?))`,
        [room_id, end_time, start_time, start_time, end_time]
    );
    return rows.length === 0; // ถ้าไม่มีการจองซ้อนกัน return true
};

export const cancelBooking = async (booking_id, user_id) => {
    const [result] = await db.query(
        "DELETE FROM Booking WHERE booking_id = ? AND user_id = ?",
        [booking_id, user_id]
    );
    return result.affectedRows > 0;
};
