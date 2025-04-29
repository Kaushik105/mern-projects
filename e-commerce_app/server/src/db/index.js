import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(
			`${process.env.MONGODB_URI}/${DB_NAME}`
		);
		console.log("\nMongoDB connected to", connection.connections[0].name);

		return connection;
	} catch (error) {
		throw new ApiError(500, "Database connection failed");
	}
};

export default connectDB;
