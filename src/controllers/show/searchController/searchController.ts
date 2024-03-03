import { StatusCodes } from "@/@types";
import sendSuccessResponse from "@utils/sendSuccessResponse";
import tryCatch from "@utils/tryCatch";
import throwErrorIfNotValidSchema from "@utils/validation/validate";
import elastic from "@models/Search/Search";

export const search = tryCatch(async (req, res, next) => {
  throwErrorIfNotValidSchema(req);
  const query = req.query.query as string;
  const searchResponse = await elastic.searchShow(query);
  sendSuccessResponse(res, searchResponse, StatusCodes.OK);
});
