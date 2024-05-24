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
        options: { min: 4, max: 20 },
        errorMessage: "Query must be between 4 and 20 characters",
      },
    },
  });

export default searchQueryValidation;
