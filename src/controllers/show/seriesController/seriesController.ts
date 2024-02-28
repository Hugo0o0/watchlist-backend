import series from "@models/Series/Series";
import sendSuccessResponse from "@utils/sendSuccessResponse";
import tryCatch from "@utils/tryCatch";
import throwErrorIfNotValidSchema from "@utils/validation/validate";

export const getSeries = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { page = 1, limit = 50 } = req.query;
  const offset = (+page - 1) * +limit;
  const seriesData = await series.getSeries(offset, +limit);
  sendSuccessResponse(res, seriesData);
});

export const getOneSeries = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const movieData = await series.getOneSeries(id);
  sendSuccessResponse(res, movieData);
});

export const addBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId } = req.body;
  const movieData = await series.bookmark(id, userId);
  sendSuccessResponse(res, movieData);
});

export const removeBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId } = req.body;
  const movieData = await series.removeBookmark(id, userId);
  sendSuccessResponse(res, movieData);
});

export const getBookmarkedSeries = tryCatch(async (req, res) => {
  const movieData = await series.getBookmarkedSeries(req.body.userId);
  sendSuccessResponse(res, movieData);
});

export const rateSeries = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId, rating, ratingId } = req.body;
  const ratedSeries = await series.rateSeries({
    showId: id,
    rating,
    userId,
    ratingId,
  });
  sendSuccessResponse(res, ratedSeries);
});

export const getRatedSeries = tryCatch(async (req, res) => {
  const ratedSeries = await series.getRatedSeries(req.body.userId);
  sendSuccessResponse(res, ratedSeries);
});
