import { checkSchema } from "express-validator";

const searchQueryValidation = () =>
  checkSchema({
    query: {
      in: ["query"],
      isString: {
        errorMessage: "Invalid query",
      },
      escape: true,
      trim: true,
      isLength: {
        options: { min: 1, max: 100 },
        errorMessage: "Query must be between 1 and 100 characters",
      },
    },
  });

export default searchQueryValidation;
