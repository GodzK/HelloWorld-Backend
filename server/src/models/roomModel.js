import db from "../config/database.js";

export const getAllRooms = async () => {
    const [rows] = await db.query(`SELECT * FROM Rooms`);
    return rows;
};

export const getRoomById = async (roomId) => {
    const [rows] = await db.query(`SELECT * FROM Rooms WHERE room_id = ?`, [roomId]);
    return rows.length > 0 ? rows[0] : null;
};

export const createRoom = async (room_name, capacity, area) => {
    const [result] = await db.query(
        `INSERT INTO Rooms (room_name, capacity, area) VALUES (?, ?, ?)`,
        [room_name, capacity, area]
    );
    return result;
};
