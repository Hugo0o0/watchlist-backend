import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import UnauthorizedError from "@utils/Error/UnauthorizedError";

class TokenProcessor {
  generateToken(payload: JwtPayload) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) throw new UnauthorizedError("Invalid token");
      return decoded;
    });
  }
}

export default TokenProcessor;
