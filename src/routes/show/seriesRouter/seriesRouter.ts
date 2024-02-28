import {
  addBookmark,
  getBookmarkedSeries,
  getOneSeries,
  getRatedSeries,
  getSeries,
  rateSeries,
  removeBookmark,
} from "@controllers/show/seriesController/seriesController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import isRatedBefore from "@middlewares/show/isRatedBefore";
import validateObjectId from "@utils/validation/objectId/validateObjectId";
import paginationQueriesValidation from "@utils/validation/pagination/pagination";
import hasValidRatingData from "@utils/validation/rating/hasValidRatingData";
import { Router } from "express";

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

router.get(
  "/show/series",
  hasValidToken,
  paginationQueriesValidation(),
  getSeries
);

router.get("/show/series/:id", hasValidToken, getOneSeries);

export default router;
