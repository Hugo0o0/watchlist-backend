import { StatusCodes } from "@/@types";
import { Response } from "express";
import { stat } from "fs";

const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode: StatusCodes = StatusCodes.OK
) => {
  res.status(statusCode).json({
    status: "success",
    data,
  });
};

export default sendSuccessResponse;
