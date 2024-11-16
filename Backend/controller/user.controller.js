import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookies from '../jwt/generateToken.js';
import  jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!fullname || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
        });

        // Save the new user to the database
        await newUser.save();
        
        // Create token and set it in cookies
        createTokenAndSaveCookies(req, res, newUser._id);  // Pass req and res to the function

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Create token and set it in cookies
        // createTokenAndSaveCookies(req, res, user._id);  // Pass req and res to the function
        const userId = user._id
        const token = jwt.sign({ userId}, process.env.JWT_TOKEN, { expiresIn: '1h' });
        res.cookie('jwt', token, // Sets the expiration in milliseconds (1 hour)
        );
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const allUsers = async (req, res) => {
    try {
        const loggedInUser = req.user?._id; // User from the secureRoute middleware
        
        if (!loggedInUser) {
            return res.status(401).json({ error: "Unauthorized: User not found in request" });
        }

        // Find users excluding the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        
        // Send the filtered users as response
        res.status(200).json({ message: "Users fetched successfully", users: filteredUsers });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Server error occurred while fetching users" });
    }
};
