import movie from "@models/Movie/Movie";
import sendSuccessResponse from "@utils/sendSuccessResponse";
import tryCatch from "@utils/tryCatch";
import throwErrorIfNotValidSchema from "@utils/validation/validate";

export const getMovies = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { page = 1, limit = 50 } = req.query;
  const offset = (+page - 1) * +limit;
  const movies = await movie.getMovies(offset, +limit);
  sendSuccessResponse(res, movies);
});

export const getMovie = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const movieData = await movie.getMovie(id);
  sendSuccessResponse(res, movieData);
});

export const getBookmarkedMovies = tryCatch(async (req, res) => {
  const bookmarkedMovies = await movie.getBookmarkedMovies(req.body.userId);
  sendSuccessResponse(res, bookmarkedMovies);
});

export const addBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const bookmarked = await movie.bookmark(req.params.id, req.body.userId);
  sendSuccessResponse(res, bookmarked);
});

export const removeBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const removedBookmark = await movie.removeBookmark(
    req.params.id,
    req.body.userId
  );
  sendSuccessResponse(res, removedBookmark);
});

export const rateMovie = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  sendSuccessResponse(res, {
    status: "success",
    message: "Movie rated successfully",
  });
});
