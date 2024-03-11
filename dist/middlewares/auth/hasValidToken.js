"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasValidToken = void 0;
const UnauthorizedError_1 = __importDefault(require("../../utils/Error/UnauthorizedError"));
const TokenProcessor_1 = __importDefault(require("../../utils/jwt/TokenProcessor"));
const excludeBearer_1 = __importDefault(require("../../utils/jwt/excludeBearer"));
const tokenProcessor = new TokenProcessor_1.default();
const hasValidToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return next(new UnauthorizedError_1.default("Token is required"));
    const normalizedToken = (0, excludeBearer_1.default)(token);
    const decodedToken = tokenProcessor.verifyToken(normalizedToken);
    req.body.userId = decodedToken.id;
    next();
};
exports.hasValidToken = hasValidToken;
//# sourceMappingURL=hasValidToken.js.map