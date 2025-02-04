import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "../models/authModel.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // สร้างผู้ใช้ใหม่โดยไม่ต้องเข้ารหัสรหัสผ่าน
        const userId = await createUser(firstname, lastname, email, password, role);

        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ตรวจสอบรหัสผ่านโดยไม่ต้องเข้ารหัส
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // สร้าง JWT
        const token = jwt.sign(
            { id: user.user_id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
        );

        // ตั้งค่า Cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
};