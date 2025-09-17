import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { errorResponse } from "../utils/response";

export const validateRequest =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues?.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return res
        .status(400)
        .json(errorResponse("Validation error", { issues }));
    }
    // Replace body with parsed/typed value
    req.body = result.data;
    next();
  };
