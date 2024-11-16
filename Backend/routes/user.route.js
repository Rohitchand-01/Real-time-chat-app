import express from 'express';
import { login, logout, signup, allUsers } from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route for user logout
router.post("/logout", logout);

// Route for fetching all users (protected by secureRoute middleware)
router.get("/allusers", secureRoute, allUsers);

export default router;
