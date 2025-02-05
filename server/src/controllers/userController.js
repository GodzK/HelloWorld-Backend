import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../models/userModel.js";
import db from "../config/database.js";


export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({ firstname, lastname, email, password: hashedPassword, role });

        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: newUser.insertId, 
                firstname,
                lastname,
                email,
                role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user) return res.status(401).json({ message: "No user found" });

        const passwordMatch = await bcrypt.compare(password, user.password); 

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        console.log("User from DB:", user); 
console.log("Password Match:", passwordMatch); 
        res.json({ message: "Login successful", data: user });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};


// 🔹 Logout User
export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.json({ message: "Logout successful" });
    });
};
