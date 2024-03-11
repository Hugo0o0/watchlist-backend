"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEror = void 0;
class AppEror extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppEror = AppEror;
//# sourceMappingURL=AppError.js.map