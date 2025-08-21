import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/sendToken.utility.js";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required ✍️", 400));
  }

  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists 🚫", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

  const newUser = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar,
  });

  sendToken(newUser, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(username);
  if (!username || !password) {
    return next(
      new errorHandler("Please enter a valid username or password 🔑", 400)
    );
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(
      new errorHandler("Please enter a valid username or password 🔑", 400)
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(
      new errorHandler("Please enter a valid username or password 🔑", 400)
    );
  }

  sendToken(user, 200, res);
});

export const logout = asyncHandler(async (req, res, next) => {
  // Clear the cookie by setting it to null and expiring immediately
  res.cookie("token", null, {
    expires: new Date(Date.now()), // expire now
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully 👋",
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  // when use first approach in auth.middleware.js file. Then use this line.
  // const userId = req.user;

  // when use second approach in auth.middleware.js file. Then use this line.
  const userId = req.user._id;

  const profile = await User.findById(userId);

  res.status(200).json({
    success: true,
    responseData: profile,
  });
});
