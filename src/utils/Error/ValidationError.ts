import { StatusCodes } from "@/@types";
import { AppEror } from "./AppError";

export class ValidationError extends AppEror {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
