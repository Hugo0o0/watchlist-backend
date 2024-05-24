import {
  addBookmark,
  deleteRating,
  getBookmarkedSeries,
  getOneSeries,
  getRatedSeries,
  getSeries,
  rateSeries,
  removeBookmark,
  updateRating,
} from "@controllers/show/seriesController/seriesController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import isRatedBefore from "@middlewares/show/isRatedBefore";
import validateObjectId from "@utils/validation/objectId/validateObjectId";
import paginationQueriesValidation from "@utils/validation/pagination/pagination";
import hasValidRatingData from "@utils/validation/rating/hasValidRatingData";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/show/series/bookmark", hasValidToken, getBookmarkedSeries);
router.post(
  "/show/series/bookmark/:id",
  hasValidToken,
  validateObjectId(),
  addBookmark
);
router.delete(
  "/show/series/bookmark/:id",
  hasValidToken,
  validateObjectId(),
  removeBookmark
);

router.get("/show/series/rate", hasValidToken, getRatedSeries);
router.post(
  "/show/series/rate/:id",
  hasValidToken,
  validateObjectId(),
  isRatedBefore,
  hasValidRatingData(),
  rateSeries
);
router.put(
  "/show/series/rate/:id",
  hasValidToken,
  validateObjectId(),
  body("ratingId", "Rating id is required")
    .isString()
    .withMessage("Rating id must be a string")
    .custom((value: string) => {
      const matched = value.match(/^[0-9a-fA-F]{24}$/);
      if (!matched) return false;
      return true;
    })
    .withMessage("Invalid id format"),
  body("rating", "Rating is required")
    .isInt({ max: 10, min: 1 })
    .withMessage("Rating must be an integer"),
  updateRating
);
router.delete(
  "/show/series/rate/:id",
  hasValidToken,
  validateObjectId(),
  deleteRating
);

router.get(
  "/show/series",
  hasValidToken,
  paginationQueriesValidation(),
  getSeries
);

router.get("/show/series/:id", hasValidToken, getOneSeries);

export default router;
