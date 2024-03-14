import { ErrorRequestHandler, Request, Response } from "express";
import "dotenv/config";
import { AppEror } from "@/utils/Error/AppError";
import { StatusCodes } from "@/@types";

const isProduction = process.env.NODE_ENV === "production";

const errorHandler: ErrorRequestHandler = (err: AppEror, req, res, next) => {
  if (!isProduction) {
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: {
          name: err.name,
          statusCode: err.statusCode,
          stack: err.stack,
        },
        message: err.message,
      });
  }

  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }

  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong" });
};

export default errorHandler;
