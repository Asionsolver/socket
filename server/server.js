import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./db/connection.db.js";
import { errorMiddleWare } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//server health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Success", message: "Server is healthy 💪" });
});

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// middlewares
app.use(errorMiddleWare);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
