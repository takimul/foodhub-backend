import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { AppError } from "../errors/AppError";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const headers = new Headers();

    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers.append(key, value);
      }
    });

    const session = await auth.api.getSession({
      headers,
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    (req as any).user = session.user;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireRole =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new AppError(401, "Unauthorized"));
    }

    if (!roles.includes(user.role)) {
      return next(new AppError(403, "Forbidden"));
    }

    next();
  };
