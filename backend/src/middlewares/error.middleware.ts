import { Request, Response, NextFunction } from "express";

import HTTP_STATUS from '../constants/httpStatusCodes';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const status = error.status ?? error.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = error.message || "Internal server error.";

  if (status >= 500) {
    console.error(error.stack);
  }

  res.status(status).json({
    success: false,
    message,
    error: error.errors?.map((e: any) => e.message).join(", ") ?? error.name ?? "InternalServerError"
  });
}
