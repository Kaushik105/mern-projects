import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/user.route.js"
import adminProductRouter from "./routes/admin/product.route.js"
import shopProductRouter from "./routes/shop/product.route.js"
import shopCartRouter from "./routes/shop/cart.route.js"
import shopAddressRouter from "./routes/shop/address.route.js"

const app = express();

// --Middlewares--

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,PATCH,POST,DELETE,PUT",
		allowHeaders: [
			"Content-Type",
			"Authorization",
			"Cache-Control",
			"Expires",
			"Pragma",
		],
		credentials: true,
	})
);
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// --Routes--
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter)
app.use("/api/shop/products", shopProductRouter)
app.use("/api/shop/cart", shopCartRouter)
app.use("/api/shop/address", shopAddressRouter)

export { app };
