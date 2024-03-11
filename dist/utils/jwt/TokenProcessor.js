"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const UnauthorizedError_1 = __importDefault(require("../Error/UnauthorizedError"));
class TokenProcessor {
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                throw new UnauthorizedError_1.default("Invalid token");
            return decoded;
        });
    }
}
exports.default = TokenProcessor;
//# sourceMappingURL=TokenProcessor.js.map