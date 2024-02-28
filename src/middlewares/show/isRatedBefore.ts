import movie from "@models/Movie/Movie";
import series from "@models/Series/Series";
import BadRequestError from "@utils/Error/BadRequestError";
import tryCatch from "@utils/tryCatch";

const isRatedBefore = tryCatch(async (req, res, next) => {
  const showName = req.path.split("/")[2];
  let ratedShow;
  if (showName === "movie") {
    ratedShow = await movie.isRatedBefore(req.params.id, req.body.userId);
  } else if (showName === "series") {
    ratedShow = await series.isRatedBefore(req.params.id, req.body.userId);
  }
  if (!ratedShow) return next();
  if (!req.body.ratingId) next(new BadRequestError("Already rated before"));
  next();
});

export default isRatedBefore;
