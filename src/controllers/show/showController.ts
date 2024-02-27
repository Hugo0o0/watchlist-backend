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
