"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const searchQueryValidation = () => (0, express_validator_1.checkSchema)({
    query: {
        in: ["query"],
        isString: {
            errorMessage: "Invalid query",
        },
        escape: true,
        trim: true,
        isLength: {
            options: { min: 1, max: 100 },
            errorMessage: "Query must be between 1 and 100 characters",
        },
    },
});
exports.default = searchQueryValidation;
//# sourceMappingURL=searchQueryValidation.js.map