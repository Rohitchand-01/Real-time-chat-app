import jwt from "jsonwebtoken";
import Cookies from "cookies";

const createTokenAndSaveCookies = (req, res, userId) => {
    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: '1h' });

    // Set token as cookie
    const cookies = new Cookies(req, res);
    cookies.set("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // Set secure flag in production
        sameSite: 'Strict',  // Ensure cookie is sent only in same-site requests
        maxAge: 3600000,  // 1 hour
    });
};

export default createTokenAndSaveCookies;
