import { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware
} from "../controllers/user.controller.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router();



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => { 
	const user = req.user;
	return res.status(200).json(new ApiResponse(200, user, "Authenticated user"))
 })

export default router;
