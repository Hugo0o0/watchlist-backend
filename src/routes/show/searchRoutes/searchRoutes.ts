import {
  search,
  searchMovie,
  searchSeries,
} from "@controllers/show/searchController/searchController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import searchQueryValidation from "@utils/validation/search/searchQueryValidation";
import { Router } from "express";

const router = Router();

router.get("/show/search", hasValidToken, searchQueryValidation(), search);
router.get(
  "/show/search/movie",
  hasValidToken,
  searchQueryValidation(),
  searchMovie
);
router.get(
  "/show/search/series",
  hasValidToken,
  searchQueryValidation(),
  searchSeries
);

export default router;
