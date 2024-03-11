"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../Error/ValidationError");
const express_validator_1 = require("express-validator");
const throwErrorIfNotValidSchema = (req) => {
    const validationResults = (0, express_validator_1.validationResult)(req);
    if (!validationResults.isEmpty()) {
        throw new ValidationError_1.ValidationError(validationResults.array()[0].msg);
    }
};
exports.default = throwErrorIfNotValidSchema;
//# sourceMappingURL=validate.js.map