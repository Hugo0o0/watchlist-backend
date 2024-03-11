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
exports.seriesSelectOptions = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
exports.seriesSelectOptions = {
    averageRating: true,
    id: true,
    name: true,
    poster: true,
    genres: { select: { name: true, id: true } },
    creators: { select: { name: true, id: true } },
    firstAirDate: true,
    lastAirDate: true,
    numberOfEpisodes: true,
    numberOfSeasons: true,
    overview: true,
    status: true,
    seasons: {
        select: {
            id: true,
            seasonNumber: true,
            episodeCount: true,
            airDate: true,
            overview: true,
            name: true,
        },
    },
    ratings: true,
};
class Series {
    constructor(series, ratedSeries) {
        this.series = series;
        this.ratedSeries = ratedSeries;
    }
    getSeries(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.series.findMany({
                skip: offset,
                take: limit,
                select: exports.seriesSelectOptions,
            });
        });
    }
    getOneSeries(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.series.findUnique({
                where: { id },
                select: exports.seriesSelectOptions,
            });
        });
    }
    bookmark(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.series.update({
                where: { id },
                data: {
                    users: {
                        connect: {
                            id: userId,
                        },
                    },
                },
                select: exports.seriesSelectOptions,
            });
        });
    }
    removeBookmark(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.series.update({
                where: { id },
                data: {
                    users: {
                        disconnect: {
                            id: userId,
                        },
                    },
                },
            });
        });
    }
    getBookmarkedSeries(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userId);
            return yield this.series.findMany({
                where: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
                select: exports.seriesSelectOptions,
            });
        });
    }
    rateSeries(rateSeriesOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                let ratedSeries;
                ratedSeries = yield tx.seriesRating.upsert({
                    where: {
                        id: rateSeriesOptions.ratingId || "65da6f24e4bfb092f708b744",
                    },
                    update: {
                        rating: rateSeriesOptions.rating,
                    },
                    create: {
                        rating: rateSeriesOptions.rating,
                        series: {
                            connect: {
                                id: rateSeriesOptions.showId,
                            },
                        },
                        user: {
                            connect: {
                                id: rateSeriesOptions.userId,
                            },
                        },
                    },
                    select: {
                        series: {
                            select: exports.seriesSelectOptions,
                        },
                    },
                });
                const series = yield this.getOneSeries(rateSeriesOptions.showId);
                if ((series === null || series === void 0 ? void 0 : series.ratings) && (series === null || series === void 0 ? void 0 : series.ratings.length) > 10) {
                    const averageRating = series.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
                        series.ratings.length;
                    yield tx.series.update({
                        where: {
                            id: rateSeriesOptions.showId,
                        },
                        data: {
                            averageRating,
                        },
                    });
                }
                return ratedSeries;
            }));
        });
    }
    getRatedSeries(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ratedSeries.findMany({
                where: {
                    user: {
                        id: userId,
                    },
                },
                include: {
                    series: {
                        select: exports.seriesSelectOptions,
                    },
                },
            });
        });
    }
    isRatedBefore(seriesId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ratedSeries.findFirst({
                where: {
                    series: {
                        id: seriesId,
                    },
                    userId,
                },
            });
        });
    }
}
const series = new Series(prisma_1.default.series, prisma_1.default.seriesRating);
exports.default = series;
//# sourceMappingURL=Series.js.map