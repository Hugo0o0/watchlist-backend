import {
  getOneSeries,
  getSeries,
} from "@controllers/show/seriesController/seriesController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import paginationQueriesValidation from "@utils/validation/pagination/pagination";
import { Router } from "express";

const router = Router();

router.get(
  "/show/series",
  hasValidToken,
  paginationQueriesValidation(),
  getSeries
);

router.get("/show/series/:id", hasValidToken, getOneSeries);

export default router;
