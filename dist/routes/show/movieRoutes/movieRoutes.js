"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movieController_1 = require("../../../controllers/show/movieController/movieController");
const hasValidToken_1 = require("../../../middlewares/auth/hasValidToken");
const isRatedBefore_1 = __importDefault(require("../../../middlewares/show/isRatedBefore"));
const validateObjectId_1 = __importDefault(require("../../../utils/validation/objectId/validateObjectId"));
const pagination_1 = __importDefault(require("../../../utils/validation/pagination/pagination"));
const hasValidRatingData_1 = __importDefault(require("../../../utils/validation/rating/hasValidRatingData"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/show/movie/bookmark", hasValidToken_1.hasValidToken, movieController_1.getBookmarkedMovies);
router.post("/show/movie/bookmark/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), movieController_1.addBookmark);
router.delete("/show/movie/bookmark/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), movieController_1.removeBookmark);
router.get("/show/movie/rate", hasValidToken_1.hasValidToken, movieController_1.getRatedMovies);
router.post("/show/movie/rate/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), isRatedBefore_1.default, (0, hasValidRatingData_1.default)(), movieController_1.rateMovie);
router.get("/show/movie", hasValidToken_1.hasValidToken, (0, pagination_1.default)(), movieController_1.getMovies);
router.get("/show/movie/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), movieController_1.getMovie);
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map