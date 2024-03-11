"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../@types");
const sendSuccessResponse = (res, data, statusCode = _types_1.StatusCodes.OK) => {
    res.status(statusCode).json({
        status: "success",
        data,
    });
};
exports.default = sendSuccessResponse;
//# sourceMappingURL=sendSuccessResponse.js.map