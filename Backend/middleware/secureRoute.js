import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
            return res.status(401).json({ error: "Access denied. Invalid token." });
        }

        // Find user by decoded userId
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Secure route error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

export default secureRoute;
