import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

//register
const registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	if (!(username && email && password)) {
		return res.json(new ApiError(400, "Something went wrong"));
	}

	const user = await User.findOne({ email });
	if (user) {
		return res.json(new ApiError(400, "User already exists"))
	}

	const hash = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		username,
		email,
		password: hash,
	});

	if (!newUser) {
		return res.json(new ApiError(500, "user registration failed"));
	}

	return res
		.status(200)
		.json(new ApiResponse(200, newUser, "Registration successful"));
});

//login

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!(email || password)) {
		return res.json(new ApiError(400, "Something went wrong"));
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.json(new ApiError(500, "user doesn't exists"));
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) {
		return res.json(new ApiError(400, "incorrect password"));
	}

	const token = Jwt.sign(
		{ _id: user._id, email: user.email, role: user.role, username: user.username },
		process.env.JWT_PRIVATE_KEY,
		{ algorithm: "HS256" }
	);
	
	
	return res
		.cookie("token", token)
		.json(new ApiResponse(200, user, "Logged in successfully"));
});

//logout

const logoutUser = asyncHandler(async (_, res) => {
	return res
		.status(200)
		.clearCookie("token")
		.json(new ApiResponse(200, "Logged out successfully"));
});

const authMiddleware = async (req, res, next) => { 
	const {token} = req.cookies
	if (!token ) {
		return res.json(new ApiError(400, "Unauthorized user"))
	} 

	try {
		const decoded = await Jwt.verify(token, process.env.JWT_PRIVATE_KEY);
		if (decoded) {
			req.user = decoded 
			next()
		}
	} catch (error) {
		return res.json(new ApiError(400, "invalid token"))
	}
 }

export { registerUser, loginUser, logoutUser, authMiddleware };
