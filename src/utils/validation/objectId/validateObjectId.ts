import BadRequestError from "@utils/Error/BadRequestError";
import { param } from "express-validator";

const validateObjectId = () =>
  param("id").custom((input: string) => {
    const matched = input.match(/^[0-9a-fA-F]{24}$/);
    if (!matched) throw new BadRequestError("Invalid id format");
    return matched;
  });

export default validateObjectId;
