import UnauthorizedError from "@utils/Error/UnauthorizedError";
import TokenProcessor from "@utils/jwt/TokenProcessor";
import excludeBearer from "@utils/jwt/excludeBearer";
import { RequestHandler } from "express";

const tokenProcessor = new TokenProcessor();
export const hasValidToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new UnauthorizedError("Token is required"));
  const normalizedToken = excludeBearer(token);
  const decodedToken = tokenProcessor.verifyToken(normalizedToken) as any;
  req.body.userId = decodedToken.id;
  next();
};
