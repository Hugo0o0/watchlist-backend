"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seriesController_1 = require("../../../controllers/show/seriesController/seriesController");
const hasValidToken_1 = require("../../../middlewares/auth/hasValidToken");
const isRatedBefore_1 = __importDefault(require("../../../middlewares/show/isRatedBefore"));
const validateObjectId_1 = __importDefault(require("../../../utils/validation/objectId/validateObjectId"));
const pagination_1 = __importDefault(require("../../../utils/validation/pagination/pagination"));
const hasValidRatingData_1 = __importDefault(require("../../../utils/validation/rating/hasValidRatingData"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/show/series/bookmark", hasValidToken_1.hasValidToken, seriesController_1.getBookmarkedSeries);
router.post("/show/series/bookmark/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), seriesController_1.addBookmark);
router.delete("/show/series/bookmark/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), seriesController_1.removeBookmark);
router.get("/show/series/rate", hasValidToken_1.hasValidToken, seriesController_1.getRatedSeries);
router.post("/show/series/rate/:id", hasValidToken_1.hasValidToken, (0, validateObjectId_1.default)(), isRatedBefore_1.default, (0, hasValidRatingData_1.default)(), seriesController_1.rateSeries);
router.get("/show/series", hasValidToken_1.hasValidToken, (0, pagination_1.default)(), seriesController_1.getSeries);
router.get("/show/series/:id", hasValidToken_1.hasValidToken, seriesController_1.getOneSeries);
exports.default = router;
//# sourceMappingURL=seriesRouter.js.map