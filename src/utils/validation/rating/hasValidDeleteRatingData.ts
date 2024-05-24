import BadRequestError from "@utils/Error/BadRequestError";
import { checkSchema } from "express-validator";

const hasValidDeleteRatingData = () =>
  checkSchema({
    ratingId: {
      isString: {
        errorMessage: "Rating id must be a string",
        bail: true,
        if: (value: string) => {
          const matched = value.match(/^[0-9a-fA-F]{24}$/);
          if (!matched) throw new BadRequestError("Invalid id format");
        },
      },
    },
  });

export default hasValidDeleteRatingData;
