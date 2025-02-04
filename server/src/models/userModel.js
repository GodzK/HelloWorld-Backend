import db from "../config/database.js";

export const getUserByEmail = async (email) => {
    const [rows] = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);
    return rows.length > 0 ? rows[0] : null;
};

export const createUser = async ({ firstname, lastname, email, password, role }) => {
    const [result] = await db.query(
        "INSERT INTO user (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)", 
        [firstname, lastname, email, password, role]
    );
    return result;
};
export const getUserProfile = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    res.json(req.session.user);
};


