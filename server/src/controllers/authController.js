import { getUserByEmail, createUser } from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        const newUser = await createUser({ firstname, lastname, email, password, role }); // No hashing

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

        if (user.password !== password) { // Direct comparison (no hashing)
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.user = {
            id: user.user_id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        };

        res.json({ message: "Login successful", data: user });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};

export const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: "Logout failed" });
        res.json({ message: "Logout successful" });
    });
};

export const getUserProfile = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    res.json(req.session.user);
};