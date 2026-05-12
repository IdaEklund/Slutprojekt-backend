import { AppError } from "../utils/AppError.js";

// Standard felhanterare i Express – känns igen via fyra parametrar (err, req, res, next).
export const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internt serverfel.";
  if (!err.statusCode) console.error(err);
  res.status(statusCode).json({ error: message });
};