import movie from "@models/Movie/Movie";
import BadRequestError from "@utils/Error/BadRequestError";
import tryCatch from "@utils/tryCatch";

const isRatedBefore = tryCatch(async (req, res, next) => {
  const ratedMovie = await movie.isRatedBefore(req.params.id, req.body.userId);
  if (!ratedMovie) return next();
  if (!req.body.ratingId) next(new BadRequestError("Already rated before"));
  next();
});

export default isRatedBefore;
