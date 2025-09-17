import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/response";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(errorResponse(err.message));
  }

  // mongoose validation error -> 400
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json(
        errorResponse("Validation error", { errors: err.errors })
      );
  }

  res.status(500).json(errorResponse("Internal Server Error"));
};
