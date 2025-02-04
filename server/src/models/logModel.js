import db from "../config/database.js";

export const createLog = async (booking_id, start_time, end_time, action, changed_by) => {
    const [result] = await db.query(
        `INSERT INTO Log (booking_id, start_time, end_time, action, changed_by) VALUES (?, ?, ?, ?, ?)`,
        [booking_id, start_time, end_time, action, changed_by]
    );
    return result;
};

export const getLogs = async () => {
    const [rows] = await db.query(`SELECT * FROM Log`);
    return rows;
};
