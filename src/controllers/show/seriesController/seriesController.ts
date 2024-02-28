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
