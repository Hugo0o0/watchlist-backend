"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchController_1 = require("../../../controllers/show/searchController/searchController");
const hasValidToken_1 = require("../../../middlewares/auth/hasValidToken");
const searchQueryValidation_1 = __importDefault(require("../../../utils/validation/search/searchQueryValidation"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/show/search", hasValidToken_1.hasValidToken, (0, searchQueryValidation_1.default)(), searchController_1.search);
exports.default = router;
//# sourceMappingURL=searchRoutes.js.map