import series from "@models/Series/Series";
import sendSuccessResponse from "@utils/sendSuccessResponse";
import tryCatch from "@utils/tryCatch";
import throwErrorIfNotValidSchema from "@utils/validation/validate";

export const getSeries = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { page = 1, limit = 50 } = req.query;
  const offset = (+page - 1) * +limit;
  const seriesData = await series.getSeries(offset, +limit, req.body.userId);
  sendSuccessResponse(res, {
    data: seriesData.series,
    metadata: {
      page: +page,
      limit: +limit,
      offset,
      totalItems: seriesData.count,
    },
  });
});

export const getOneSeries = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const seriesData = await series.getOneSeries(id, req.body.userId);
  sendSuccessResponse(res, { data: seriesData });
});

export const addBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId } = req.body;
  const seriesData = await series.bookmark(id, userId);
  sendSuccessResponse(res, { data: seriesData });
});

export const removeBookmark = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId } = req.body;
  const seriesData = await series.removeBookmark(id, userId);
  sendSuccessResponse(res, { data: seriesData });
});

export const getBookmarkedSeries = tryCatch(async (req, res) => {
  const seriesData = await series.getBookmarkedSeries(req.body.userId);
  sendSuccessResponse(res, { data: seriesData });
});

export const getRatedSeries = tryCatch(async (req, res) => {
  const ratedSeries = await series.getRatedSeries(req.body.userId);
  sendSuccessResponse(res, { data: ratedSeries });
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
  sendSuccessResponse(res, { data: ratedSeries });
});

export const updateRating = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId, rating, ratingId } = req.body;
  const updatedRating = await series.updateRating({
    showId: id,
    rating,
    userId,
    ratingId,
  });
  sendSuccessResponse(res, { data: updatedRating });
});

export const deleteRating = tryCatch(async (req, res) => {
  throwErrorIfNotValidSchema(req);
  const { id } = req.params;
  const { userId, ratingId } = req.body;
  const removedRating = await series.deleteRating(id, ratingId, userId);
  sendSuccessResponse(res, { data: removedRating });
});
