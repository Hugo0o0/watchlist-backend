import { StatusCodes } from "@/@types";
import TokenProcessor from "@utils/jwt/TokenProcessor";
import user from "@models/User/User";
import tryCatch from "@utils/tryCatch";
import throwErrorIfNotValidSchema from "@utils/validation/validate";
import sendSuccessResponse from "@utils/sendSuccessResponse";

const token = new TokenProcessor();

export const emailLogin = tryCatch(async (req, res, next) => {
  throwErrorIfNotValidSchema(req);
  const { email } = await user.login(req.body.email, req.body.password);
  const jwt = token.generateToken({ email });
  sendSuccessResponse(res, { email, token: jwt });
});

export const emailRegister = tryCatch(async (req, res, next) => {
  throwErrorIfNotValidSchema(req);
  const { email } = await user.register(req.body.email, req.body.password);
  const jwt = token.generateToken({ email });
  sendSuccessResponse(res, { email, token: jwt }, StatusCodes.CREATED);
});
