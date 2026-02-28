import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error: any) {
      const message =
        error?.issues?.map((i: any) => i.message).join(", ") ||
        "Validation error";

      next(new AppError(400, message));
    }
  };
