"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const _types_1 = require("../../@types");
const isProduction = process.env.NODE_ENV === "production";
const errorHandler = (err, req, res, next) => {
    if (!isProduction) {
        return res
            .status(err.statusCode || _types_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
            error: {
                name: err.name,
                statusCode: err.statusCode,
                stack: err.stack,
            },
            message: err.message,
        });
    }
    if (err.isOperational) {
        return res
            .status(err.statusCode)
            .json({ status: err.status, message: err.message });
    }
    return res
        .status(err.statusCode || _types_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map