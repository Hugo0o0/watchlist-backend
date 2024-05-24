import { ErrorRequestHandler, Request, Response } from "express";
import "dotenv/config";
import { AppEror } from "@/utils/Error/AppError";
import { StatusCodes } from "@/@types";
import fs from "fs";

const isProduction = process.env.NODE_ENV === "production";

const writeErrorLog = (err: AppEror, req: Request) => {
  const errors = fs.createWriteStream("errors.log", { flags: "a" });
  const error = err.message.replace(/\n/g, " ");
  errors.write(
    "\n" +
      `${error}` +
      "\n" +
      `user ${req.body.userId}` +
      "\n" +
      `${req.method}` +
      "\n" +
      `path ${req.path}` +
      "\n"
  );
  errors.end();
};

const errorHandler: ErrorRequestHandler = (err: AppEror, req, res, next) => {
  writeErrorLog(err, req);
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

  if (err.name === "NotFoundError") {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ status: "fail", message: err.message });
  }

  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }

  return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    message:
      "Your request could not be fulfilled at this time. Please try again later.",
  });
};

export default errorHandler;
