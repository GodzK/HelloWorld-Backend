import db from "../config/database.js";

export const getUserById = async (userId) => {
    try {
        console.log("Fetching user with ID:", userId); //ดีบัก

        const [rows] = await db.promise().query(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        );

        return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
        console.error("Database error:", error); 
        throw error; 
    }
};
