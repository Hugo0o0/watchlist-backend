import { checkSchema } from "express-validator";

const paginationQueriesValidation = () =>
  checkSchema({
    page: {
      optional: true,
      isInt: {
        errorMessage: "page must be an integer",
        bail: true,
        options: { min: 1 },
      },
    },
    limit: {
      optional: true,
      isInt: {
        errorMessage:
          "Limit can only be an integer and must be between 1 and 50",
        bail: true,
        options: { min: 1, max: 50 },
      },
    },
  });

export default paginationQueriesValidation;
