import BadRequestError from "@utils/Error/BadRequestError";
import { checkSchema } from "express-validator";

const hasValidRatingData = () =>
  checkSchema({
    rating: {
      errorMessage: "Rating is required",
      isInt: {
        errorMessage: "Rating must be an integer",
        bail: true,
        options: {
          max: 10,
          min: 1,
        },
      },
    },

    ratingId: {
      optional: true,
      isString: {
        errorMessage: "Rating id must be a string",
        bail: true,
        if: (value: string) => {
          const matched = value.match(/^[0-9a-fA-F]{24}$/);
          if (!matched) throw new BadRequestError("Invalid id format");
          return matched;
        },
      },
    },
  });

export default hasValidRatingData;
