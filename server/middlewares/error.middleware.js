export const errorMiddleWare = (err, req, res, nex) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    errMessage: err.message,
  });
};
