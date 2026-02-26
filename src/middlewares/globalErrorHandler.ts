import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { Prisma } from "../../generated/prisma";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Prisma unique constraint
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      message = "Duplicate field value";
    }
  }

  // Validation errors
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  // Fallback
  else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
