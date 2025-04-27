import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

// --Middlewares--

app.use(
	cors({
		origin: "*",
		methods: "GET,PATCH,POST,DELETE",
        allowHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        Credentials: true
	})
);
app.use(cookieParser())
app.use(express.json())


// --Routes--

app.get("/", (req, res) => {
	res.send("woow");
});

export { app };
