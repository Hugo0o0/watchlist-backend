import { ValidationError } from "@utils/Error/ValidationError";
import { Request } from "express";
import { validationResult } from "express-validator";

const throwErrorIfNotValidSchema = (req: Request) => {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    throw new ValidationError(validationResults.array()[0].msg);
  }
};

export default throwErrorIfNotValidSchema;
