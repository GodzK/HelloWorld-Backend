import db from "../config/database.js";

export const getAllRooms = async () => {
    const [rows] = await db.query(`SELECT * FROM rooms`);
    return rows;
};

export const getRoomById = async (roomId) => {
    const [rows] = await db.query(`SELECT * FROM rooms WHERE id = ?`, [roomId]);
    return rows.length > 0 ? rows[0] : null;
};

export const createRoom = async (name, capacity) => {
    const [result] = await db.query(`INSERT INTO rooms (name, capacity) VALUES (?, ?)`, [name, capacity]);
    return result;
};