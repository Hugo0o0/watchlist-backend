"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const _types_1 = require("../../@types");
const AppError_1 = require("./AppError");
class ValidationError extends AppError_1.AppEror {
    constructor(message) {
        super(message, _types_1.StatusCodes.BAD_REQUEST);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map