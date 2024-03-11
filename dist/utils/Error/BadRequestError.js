"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../@types");
const AppError_1 = require("./AppError");
class BadRequestError extends AppError_1.AppEror {
    constructor(message) {
        super(message, _types_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map