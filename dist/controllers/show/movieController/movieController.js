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
exports.getRatedMovies = exports.rateMovie = exports.removeBookmark = exports.addBookmark = exports.getBookmarkedMovies = exports.getMovie = exports.getMovies = void 0;
const Movie_1 = __importDefault(require("../../../models/Movie/Movie"));
const sendSuccessResponse_1 = __importDefault(require("../../../utils/sendSuccessResponse"));
const tryCatch_1 = __importDefault(require("../../../utils/tryCatch"));
const validate_1 = __importDefault(require("../../../utils/validation/validate"));
var DefaultOffsetValues;
(function (DefaultOffsetValues) {
    DefaultOffsetValues[DefaultOffsetValues["PAGE"] = 1] = "PAGE";
    DefaultOffsetValues[DefaultOffsetValues["LIMIT"] = 50] = "LIMIT";
})(DefaultOffsetValues || (DefaultOffsetValues = {}));
exports.getMovies = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { page = DefaultOffsetValues.PAGE, limit = DefaultOffsetValues.LIMIT } = req.query;
    const offset = (+page - 1) * +limit;
    const movies = yield Movie_1.default.getMovies(offset, +limit);
    (0, sendSuccessResponse_1.default)(res, movies);
}));
exports.getMovie = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const { id } = req.params;
    const movieData = yield Movie_1.default.getMovie(id);
    (0, sendSuccessResponse_1.default)(res, movieData);
}));
exports.getBookmarkedMovies = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookmarkedMovies = yield Movie_1.default.getBookmarkedMovies(req.body.userId);
    (0, sendSuccessResponse_1.default)(res, bookmarkedMovies);
}));
exports.addBookmark = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const bookmarked = yield Movie_1.default.bookmark(req.params.id, req.body.userId);
    (0, sendSuccessResponse_1.default)(res, bookmarked);
}));
exports.removeBookmark = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const removedBookmark = yield Movie_1.default.removeBookmark(req.params.id, req.body.userId);
    (0, sendSuccessResponse_1.default)(res, removedBookmark);
}));
exports.rateMovie = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validate_1.default)(req);
    const ratedMovie = yield Movie_1.default.rateMovie({
        showId: req.params.id,
        userId: req.body.userId,
        rating: req.body.rating,
        ratingId: req.body.ratingId,
    });
    (0, sendSuccessResponse_1.default)(res, ratedMovie);
}));
exports.getRatedMovies = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ratedMovies = yield Movie_1.default.getRatedMovies(req.body.userId);
    (0, sendSuccessResponse_1.default)(res, ratedMovies);
}));
//# sourceMappingURL=movieController.js.map