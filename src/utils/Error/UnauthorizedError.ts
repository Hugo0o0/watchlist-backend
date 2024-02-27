import { StatusCodes } from "@/@types";
import { AppEror } from "./AppError";

class UnauthorizedError extends AppEror {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnauthorizedError;
