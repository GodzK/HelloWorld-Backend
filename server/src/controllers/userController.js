import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../models/userModel.js";
import db from "../config/database.js";

// 🔹 Register User
export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
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

// 🔹 Login User (Session-Based)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;  // Capture email and password from request body
        const user = await getUserByEmail(email); // Fetch user by email
        console.log(user);

        if (!user) return res.status(401).json({ message: "No user found" });

        // Directly compare the provided password with the stored password
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "Login successful", data: user });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

// 🔹 Get User Profile (Session-Based)
export const getUserProfile = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    res.json(req.session.user);
};

// 🔹 Logout User
export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.json({ message: "Logout successful" });
    });
};
