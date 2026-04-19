import {app} from "./app.js"
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { ApiError } from "./utils/ApiError.js";

dotenv.config({
	path: "./.env",
});

connectDB()
	.then(() => {
		app.on("error", (error) => {
			throw new ApiError(500, "Mongodb Connection failed", error);
		});
		app.listen(process.env.PORT, "0.0.0.0", () => {
			console.log("Server is running on :: ", process.env.PORT);
		});
	})
	.catch((error) => {
		console.log("MongoDB connection failed :: ", error);
	});
