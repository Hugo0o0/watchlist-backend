import movie from "@models/Movie/Movie";
import sendSuccessResponse from "@utils/sendSuccessResponse";
import tryCatch from "@utils/tryCatch";
import throwErrorIfNotValidSchema from "@utils/validation/validate";

export const getMovies = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { page = 1, limit = 50 } = req.query;
  const offset = (+page - 1) * +limit;
  const movies = await movie.getMovies(offset, +limit, req.body.userId);
  sendSuccessResponse(res, {
    data: movies.movies,
    metadata: {
      page: +page,
      limit: +limit,
      offset,
      totalItems: movies.count,
    },
  });
});

export const getMovie = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const movieData = await movie.getMovie(id, req.body.userId);
  sendSuccessResponse(res, { data: movieData });
});

export const getBookmarkedMovies = tryCatch(async (req, res) => {
  const bookmarkedMovies = await movie.getBookmarkedMovies(req.body.userId);
  sendSuccessResponse(res, { data: bookmarkedMovies });
});

export const addBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const bookmarked = await movie.bookmark(req.params.id, req.body.userId);
  sendSuccessResponse(res, { data: bookmarked });
});

export const removeBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const removedBookmark = await movie.removeBookmark(
    req.params.id,
    req.body.userId
  );
  sendSuccessResponse(res, { data: removedBookmark });
});

export const getRatedMovies = tryCatch(async (req, res) => {
  const ratedMovies = await movie.getRatedMovies(req.body.userId);
  sendSuccessResponse(res, { data: ratedMovies });
});

export const rateMovie = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const ratedMovie = await movie.rateMovie({
    showId: req.params.id,
    userId: req.body.userId,
    rating: req.body.rating,
    ratingId: req.body.ratingId,
  });
  sendSuccessResponse(res, { data: ratedMovie });
});

export const deleteRating = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const removedRating = await movie.deleteRating(
    req.params.id,
    req.body.ratingId,
    req.body.userId
  );
  sendSuccessResponse(res, { data: removedRating });
});

export const updateRating = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const updatedRating = await movie.updateRating({
    showId: req.params.id,
    userId: req.body.userId,
    rating: req.body.rating,
    ratingId: req.body.ratingId,
  });
  sendSuccessResponse(res, { data: updatedRating });
});
