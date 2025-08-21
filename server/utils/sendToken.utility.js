import jwt from "jsonwebtoken";

export const sendToken = (user, statusCode, res) => {
  // Payload for JWT
  const tokenData = {
    _id: user?._id,
  };

  // Generate token
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };
  // Send response with cookie and token
  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    responseData: {
      user,
      token,
    },
  });
};
