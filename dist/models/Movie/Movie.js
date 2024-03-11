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
const prisma_1 = __importDefault(require("../../prisma"));
const movieSelectOptions = {
    genres: { select: { name: true, id: true } },
    averageRating: true,
    title: true,
    id: true,
    budget: true,
    homepage: true,
    imdbId: true,
    overview: true,
    poster: true,
    productionCompanies: {
        select: { name: true, id: true, originCountry: true },
    },
    releaseDate: true,
    productionCountries: { select: { name: true, id: true, iso_3166: true } },
    ratings: { select: { rating: true, id: true } },
    revenue: true,
    runtime: true,
    status: true,
};
class Movie {
    constructor(movie, ratedMovie) {
        this.movie = movie;
        this.ratedMovie = ratedMovie;
    }
    getMovies(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movie.findMany({
                skip: offset,
                take: limit,
                select: movieSelectOptions,
            });
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movie.findUnique({
                where: { id },
                select: movieSelectOptions,
            });
        });
    }
    bookmark(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movie.update({
                where: { id },
                data: {
                    users: {
                        connect: {
                            id: userId,
                        },
                    },
                },
                select: movieSelectOptions,
            });
        });
    }
    removeBookmark(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movie.update({
                where: { id },
                data: {
                    users: {
                        disconnect: {
                            id: userId,
                        },
                    },
                },
                select: movieSelectOptions,
            });
        });
    }
    getBookmarkedMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movie.findMany({
                where: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
                select: movieSelectOptions,
            });
        });
    }
    rateMovie(rateMovieOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                let ratedMovie;
                ratedMovie = yield tx.movieRating.upsert({
                    where: {
                        id: rateMovieOptions.ratingId || "65da6f24e4bfb092f708b744",
                    },
                    update: {
                        rating: rateMovieOptions.rating,
                    },
                    create: {
                        rating: rateMovieOptions.rating,
                        movie: {
                            connect: {
                                id: rateMovieOptions.showId,
                            },
                        },
                        user: {
                            connect: {
                                id: rateMovieOptions.userId,
                            },
                        },
                    },
                    select: {
                        movie: {
                            select: movieSelectOptions,
                        },
                    },
                });
                const movie = yield this.getMovie(rateMovieOptions.showId);
                if ((movie === null || movie === void 0 ? void 0 : movie.ratings) && (movie === null || movie === void 0 ? void 0 : movie.ratings.length) > 10) {
                    const averageRating = movie.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
                        movie.ratings.length;
                    yield tx.movie.update({
                        where: {
                            id: rateMovieOptions.showId,
                        },
                        data: {
                            averageRating,
                        },
                    });
                }
                return ratedMovie;
            }));
        });
    }
    getRatedMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ratedMovie.findMany({
                where: {
                    user: {
                        id: userId,
                    },
                },
                include: {
                    movie: {
                        select: movieSelectOptions,
                    },
                },
            });
        });
    }
    isRatedBefore(movieId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ratedMovie.findFirst({
                where: {
                    movie: {
                        id: movieId,
                    },
                    userId,
                },
            });
        });
    }
}
const movie = new Movie(prisma_1.default.movie, prisma_1.default.movieRating);
exports.default = movie;
//# sourceMappingURL=Movie.js.map