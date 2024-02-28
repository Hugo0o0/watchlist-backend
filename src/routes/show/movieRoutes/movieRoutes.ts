import {
  addBookmark,
  getBookmarkedMovies,
  getMovie,
  getMovies,
  getRatedMovies,
  rateMovie,
  removeBookmark,
} from "@controllers/show/movieController/movieController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import isRatedBefore from "@middlewares/show/isRatedBefore";
import validateObjectId from "@utils/validation/objectId/validateObjectId";
import paginationQueriesValidation from "@utils/validation/pagination/pagination";
import hasValidRatingData from "@utils/validation/rating/hasValidRatingData";
import { Router } from "express";

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

router.get(
  "/show/movie",
  hasValidToken,
  paginationQueriesValidation(),
  getMovies
);
router.get("/show/movie/:id", hasValidToken, validateObjectId(), getMovie);

export default router;
