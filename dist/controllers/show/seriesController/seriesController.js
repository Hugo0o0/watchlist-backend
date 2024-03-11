"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatedSeries = exports.rateSeries = exports.getBookmarkedSeries = exports.removeBookmark = exports.addBookmark = exports.getOneSeries = exports.getSeries = void 0;
const Series_1 = __importDefault(require("../../../models/Series/Series"));
const sendSuccessResponse_1 = __importDefault(require("../../../utils/sendSuccessResponse"));
const tryCatch_1 = __importDefault(require("../../../utils/tryCatch"));
const validate_1 = __importDefault(require("../../../utils/validation/validate"));
exports.getSeries = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { page = 1, limit = 50 } = req.query;
    const offset = (+page - 1) * +limit;
    const seriesData = yield Series_1.default.getSeries(offset, +limit);
    (0, sendSuccessResponse_1.default)(res, seriesData);
}));
exports.getOneSeries = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { id } = req.params;
    const movieData = yield Series_1.default.getOneSeries(id);
    (0, sendSuccessResponse_1.default)(res, movieData);
}));
exports.addBookmark = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { id } = req.params;
    const { userId } = req.body;
    const movieData = yield Series_1.default.bookmark(id, userId);
    (0, sendSuccessResponse_1.default)(res, movieData);
}));
exports.removeBookmark = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { id } = req.params;
    const { userId } = req.body;
    const movieData = yield Series_1.default.removeBookmark(id, userId);
    (0, sendSuccessResponse_1.default)(res, movieData);
}));
exports.getBookmarkedSeries = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieData = yield Series_1.default.getBookmarkedSeries(req.body.userId);
    (0, sendSuccessResponse_1.default)(res, movieData);
}));
exports.rateSeries = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { id } = req.params;
    const { userId, rating, ratingId } = req.body;
    const ratedSeries = yield Series_1.default.rateSeries({
        showId: id,
        rating,
        userId,
        ratingId,
    });
    (0, sendSuccessResponse_1.default)(res, ratedSeries);
}));
exports.getRatedSeries = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ratedSeries = yield Series_1.default.getRatedSeries(req.body.userId);
    (0, sendSuccessResponse_1.default)(res, ratedSeries);
}));
//# sourceMappingURL=seriesController.js.map