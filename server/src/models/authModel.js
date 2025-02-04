import pool from "../config/database.js";

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    return rows[0]; // คืนค่าผู้ใช้ตัวเดียว
};

export const createUser = async (firstname, lastname, email, password, role) => {
    const [result] = await pool.query(
        "INSERT INTO user (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, password, role]
    );
    return result.insertId;
};