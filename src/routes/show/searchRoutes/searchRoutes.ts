import { search } from "@controllers/show/searchController/searchController";
import { hasValidToken } from "@middlewares/auth/hasValidToken";
import searchQueryValidation from "@utils/validation/search/searchQueryValidation";
import { Router } from "express";

const router = Router();

router.get("/show/search", hasValidToken, searchQueryValidation(), search);

export default router;
