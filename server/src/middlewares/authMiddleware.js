import jwt from "jwt-simple";
const SECRET = process.env.JWT_SECRET;

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.decode(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};
