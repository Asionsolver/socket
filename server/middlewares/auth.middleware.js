import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.utility.js";
import { errorHandler } from "../utils/errorHandler.utility.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  //   console.log(req.cookies);
  const token =
    req.cookies.token ||
    (req.headers["authorization"] &&
      req.headers["authorization"].replace("Bearer", "").trim());
  //   console.log(token);
  if (!token) {
    return next(
      new errorHandler("🔐 Please login to access this resource", 401)
    );
  }

  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    // First Approach i send only id
    //   req.user = tokenData?._id;

    // Second Approach i send full token data. This is best practice because in future require (roles, email etc.). Then This approach helpful
    req.user = tokenData;

    next();
  } catch (err) {
    // Token expired
    if (err.name === "TokenExpiredError") {
      return next(
        new errorHandler(
          "⌛ Your session has expired. Please login again.",
          401
        )
      );
    }

    // Invalid token
    return next(new errorHandler("🔑 Invalid token. Please login again.", 401));
  }
});
