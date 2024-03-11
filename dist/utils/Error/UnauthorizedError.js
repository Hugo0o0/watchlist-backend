"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const AppError_1 = require("./AppError");
class UnauthorizedError extends AppError_1.AppEror {
    constructor(message) {
        super(message, _types_1.StatusCodes.UNAUTHORIZED);
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=UnauthorizedError.js.map