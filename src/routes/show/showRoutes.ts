import {
  addBookmark,
  getBookmarkedMovies,
  getMovie,
  getMovies,
  removeBookmark,
} from "@controllers/show/showController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import validateObjectId from "@utils/validation/objectId/validateObjectId";
import paginationQueriesValidation from "@utils/validation/pagination/pagination";
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
router.get(
  "/show/movie",
  hasValidToken,
  paginationQueriesValidation(),
  getMovies
);
router.get("/show/movie/:id", hasValidToken, validateObjectId(), getMovie);

export default router;
