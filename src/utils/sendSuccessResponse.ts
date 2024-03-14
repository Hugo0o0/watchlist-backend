import { MetaData, StatusCodes } from "@/@types";
import { Response } from "express";
import generateMetadata from "./generateMetadata";

interface ResponseData {
  data: any;
  metadata?: MetaData;
}

const sendSuccessResponse = (
  res: Response,
  data: ResponseData,
  statusCode: StatusCodes = StatusCodes.OK
) => {
  const metadata = generateMetadata(data.metadata);
  res.status(statusCode).json({
    status: "success",
    data: data.data,
    metadata,
  });
};

export default sendSuccessResponse;
