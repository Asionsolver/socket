import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import userRoute from "./routes/user.route.js";
import { connectDB } from "./db/connection.db.js";
import { errorMiddleWare } from "./middlewares/error.middleware.js";

connectDB();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//server health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Success" });
});
// routes
app.use("/api/v1/user", userRoute);

// middlewares
app.use(errorMiddleWare);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
