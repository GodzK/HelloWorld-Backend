import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "../models/userModel.js";

const SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(firstname, lastname, email, hashedPassword, role);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.user_id, role: user.role }, SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
