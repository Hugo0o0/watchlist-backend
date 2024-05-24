import { body } from "express-validator";

const hasValidUpdateRatingData = () =>
  body(["rating", "ratingId"], "Rating is required")
    .isInt({ max: 10, min: 1 })
    .withMessage("Rating must be an integer")
    .isString()
    .withMessage("Rating id must be a string")
    .custom((value: string) => {
      const matched = value.match(/^[0-9a-fA-F]{24}$/);
      if (!matched) return;
      return true;
    })
    .withMessage("Invalid id format");

export default hasValidUpdateRatingData;
