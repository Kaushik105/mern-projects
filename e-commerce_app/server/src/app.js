import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/user.route.js"
import adminProductRouter from "./routes/admin/product.route.js"
import shopProductRouter from "./routes/shop/product.route.js"
import shopCartRouter from "./routes/shop/cart.route.js"
import shopAddressRouter from "./routes/shop/address.route.js"
import shopOrderRouter from "./routes/shop/order.route.js"
import adminOrderRouter from "./routes/admin/order.route.js"
import shopSearchRouter from "./routes/shop/search.route.js"
import shopReviewRouter from "./routes/shop/review.route.js"
import shopFeatureRouter from "./routes/common/feature.route.js"

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
app.use("/api/admin/order", adminOrderRouter)

app.use("/api/shop/products", shopProductRouter)
app.use("/api/shop/cart", shopCartRouter)
app.use("/api/shop/address", shopAddressRouter)
app.use("/api/shop/order", shopOrderRouter)
app.use("/api/shop/search", shopSearchRouter)
app.use("/api/shop/review", shopReviewRouter)
app.use("/api/common/feature", shopFeatureRouter)

export { app };
