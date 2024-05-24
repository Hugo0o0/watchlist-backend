import {
  addBookmark,
  deleteRating,
  getBookmarkedMovies,
  getMovie,
  getMovies,
  getRatedMovies,
  rateMovie,
  removeBookmark,
  updateRating,
} from "@controllers/show/movieController/movieController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import isRatedBefore from "@middlewares/show/isRatedBefore";
import validateObjectId from "@utils/validation/objectId/validateObjectId";
import paginationQueriesValidation from "@utils/validation/pagination/pagination";
import hasValidDeleteRatingData from "@utils/validation/rating/hasValidDeleteRatingData";
import hasValidRatingData from "@utils/validation/rating/hasValidRatingData";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/show/movie/bookmark", hasValidToken, getBookmarkedMovies);
router.post(
  "/show/movie/bookmark/:id",
  hasValidToken,
  validateObjectId(),
  addBookmark
);
router.delete(
  "/show/movie/bookmark/:id",
  hasValidToken,
  validateObjectId(),
  removeBookmark
);
router.get("/show/movie/rate", hasValidToken, getRatedMovies);
router.post(
  "/show/movie/rate/:id",
  hasValidToken,
  validateObjectId(),
  isRatedBefore,
  hasValidRatingData(),
  rateMovie
);

router.put(
  "/show/movie/rate/:id",
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
  "/show/movie/rate/:id",
  hasValidToken,
  validateObjectId(),
  hasValidDeleteRatingData(),
  deleteRating
);

router.get(
  "/show/movie",
  hasValidToken,
  paginationQueriesValidation(),
  getMovies
);
router.get("/show/movie/:id", hasValidToken, validateObjectId(), getMovie);

export default router;
