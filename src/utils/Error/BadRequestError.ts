import { StatusCodes } from "@/@types";
import { AppEror } from "./AppError";

class BadRequestError extends AppEror {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
