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
const Movie_1 = __importDefault(require("../../models/Movie/Movie"));
const Series_1 = __importDefault(require("../../models/Series/Series"));
const BadRequestError_1 = __importDefault(require("../../utils/Error/BadRequestError"));
const tryCatch_1 = __importDefault(require("../../utils/tryCatch"));
const isRatedBefore = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const showName = req.path.split("/")[2];
    let ratedShow;
    if (showName === "movie") {
        ratedShow = yield Movie_1.default.isRatedBefore(req.params.id, req.body.userId);
    }
    else if (showName === "series") {
        ratedShow = yield Series_1.default.isRatedBefore(req.params.id, req.body.userId);
    }
    if (!ratedShow)
        return next();
    if (!req.body.ratingId)
        next(new BadRequestError_1.default("Already rated before"));
    next();
}));
exports.default = isRatedBefore;
//# sourceMappingURL=isRatedBefore.js.map